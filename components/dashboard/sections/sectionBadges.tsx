import { Badge } from "@/components/ui/badge";

export function getStatusBadge(status: SectionStatus) {
    switch (status) {
        case "active":
            return <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                Active
            </Badge>;
        case "draft":
            return <Badge variant="secondary">
                Draft
            </Badge>;
        case "disabled":
            return <Badge variant="outline" className="border-zinc-500/30 text-zinc-500 bg-zinc-500/10">
                Disabled
            </Badge>;
    }
}


export function getToneBadge(tone: Tone) {
    switch (tone) {
        case "strict":
            return <Badge variant="outline" className="border-red-500/30 text-red-500 bg-red-500/10">
                Strict
            </Badge>;
        case "neutral":
            return <Badge variant="outline" className="border-yellow-500/30 text-yellow-500 bg-yellow-500/10">
                Neutral
            </Badge>;
        case "friendly":
            return <Badge variant="outline" className="border-green-500/30 text-green-500 bg-green-500/10">
                Friendly
            </Badge>;
        case "empathetic":
            return <Badge variant="outline" className="border-blue-500/30 text-blue-500 bg-blue-500/10">
                Empathetic
            </Badge>;
    }
}