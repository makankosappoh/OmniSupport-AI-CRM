import React from 'react'
import { Card, CardHeader } from '@/components/ui/card'
interface knowledgeTableProps {
    sources: KnowledgeSource[];
    onSourceClick: (source: KnowledgeSource) => void;
    isLoading: boolean;
}

const KnowledgeTable = ({sources, onSourceClick, isLoading}: knowledgeTableProps) => {
return <Card className="border-white.5 bg-[#0a0a0e]">
    <CardHeader className="pb-4">

    </CardHeader>

    </Card>;
}

export default KnowledgeTable
