import { cookies } from "next/headers";
import Script from "next/script";

export const metadata = {
    title: "OmniSupport AI - Dashboard",
    description: "Instantly resolve customer questions with an assistant completely based on your data.",
};

export default async function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const cookieStore = await cookies();
    const metadataCookie = cookieStore.get("metadata");

    return (
        <div className="bg-[#050509] min-h-screen font-sans antialiased text-zinc-100 selection:bg-zinc-800 flex">
            {metadataCookie?.value ? (
                <>
                {children}
                </>
            ): children}
        </div>
    );
}