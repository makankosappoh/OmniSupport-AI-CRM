import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import scalekit from '@/lib/scalekit';
import {user as User} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {db} from '@/db/client';


export async function GET(req:NextRequest) {
    const {searchParams} = req.nextUrl;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    if (error) {
        return NextResponse.json(
            { error: error_description },
            { status: 401 }
        );
    }
    if (!code) {
        return NextResponse.json(
            { error: "No code provided" },
            { status: 400 }
        );
    }
    
    try {
        const redirectUri = process.env.SCALEKIT_REDIRECT_URI!;

        const authResult = await scalekit.authenticateWithCode(code, redirectUri);

        const { user, idToken } = authResult;

        //organization creating for all users to access at same time
        const claims = await scalekit.validateToken(idToken);

        const organizationId = 
            (claims as any).organization_id ||
            (claims as any).org_id ||
            (claims as any).oid ||
            null;

        if (!organizationId) {
            return NextResponse.json(
                { error: "No organization id found in token claims" },
                { status: 500 }
            );
        }

        const existing = await db
        .select()
        .from(User)
        .where(eq(User.email, user.email));
            
        if (existing.length === 0) {
            await db.insert(User).values({
                name: user?.name || "anonymous",
                email: user.email,
                organization_id: organizationId,
            });
        }

        const response = NextResponse.redirect(new URL("/", req.url));
        const userSession = {
            email: user.email,
            organization_id: organizationId,
        };

        response.cookies.set("user_session", JSON.stringify(userSession), {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });
        return response;

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Failed to get authenticate user" },
            { status: 500 }
        );
    }
}