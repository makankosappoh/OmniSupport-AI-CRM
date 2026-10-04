type SourceType = "website" | "docs" | "upload" | "text";
type SourceStatus = "active" | "training" | "error" | "excluded";

interface KnowledgeSource {
    id: string;
    user_email: string;
    name: string;
    status: string;
    type: string;
    source_url: string | null;
    created_at: string | null;
    content: string | null;
    metadata: string | null;
    last_updated: string | null;
}