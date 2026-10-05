type SourceType = "website" | "docs" | "upload" | "text";
type SourceStatus = "active" | "training" | "error" | "excluded";
type SectionStatus = "active" | "disabled" | "draft";
type Tone = "friendly" | "strict" | "neutral" | "empathetic";


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

interface SectionFormData {
    name: string;
    description: string;
    tone: Tone;
    allowedTopics: string;
    blockedTopics: string;
    fallbackBehavior: string;
}

interface Section {
    id: string;
    name: string;
    description: string;
    sourceCount: number;
    status: SectionStatus;
    tone: Tone;
    source_ids?: string[];
    scopeLabel: string;
    allowed_topics?: string | null;
    blocked_topics?: string | null;
}