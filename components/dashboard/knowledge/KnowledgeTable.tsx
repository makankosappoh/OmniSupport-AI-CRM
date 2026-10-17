import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Globe, Search, Upload, File } from 'lucide-react'
import { Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
interface knowledgeTableProps {
    sources: KnowledgeSource[];
    onSourceClick: (source: KnowledgeSource) => void;
    isLoading: boolean;
}

export const getTypeIcon = (type: SourceType) => {
    switch (type) {
        case "website":
            return <Globe className="h-5 w-5 text-blue-400" />;
        case "upload":
            return <Upload className="h-5 w-5 text-emerald-400" />;
        case "text":
            return <File className="h-5 w-5 text-zinc-400" />;
}
}
export const getStatusBadge = (status: SourceStatus) => {
    switch (status) {
        case "active":
            return (
                <Badge 
                    variant="outline" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 !text-white border-emerald-500/30 shadow-none"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                    Active
                </Badge>
            );
        case "training":
            return (
                <Badge 
                    variant="outline" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 !text-white border-yellow-500/30 shadow-none"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 animate-pulse" />
                    Training
                </Badge>
            );
        case "error":
            return (
                <Badge 
                    variant="outline" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 !text-white border-red-500/30 shadow-none"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    Error
                </Badge>
            );
        case "excluded":
            return (
                <Badge 
                    variant="outline" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 !text-white border-zinc-700/60 shadow-none"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                    Excluded
                </Badge>
            );
        default:
            return (
                <Badge 
                    variant="outline" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 !text-white border-zinc-700/60 shadow-none"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                    {status || "Unknown"}
                </Badge>
            );
    }
};

const KnowledgeTable = ({sources, onSourceClick, isLoading}: knowledgeTableProps) => {
return <Card className="border-white/5 bg-[#0a0a0e]">
    <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
            <CardTitle className= "text-base font-medium text-white">Sources</CardTitle>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input 
                    className="pl-9 h-9 w-48 md:w-75 bg-white/2 border-white/10 text-sm"
                    placeholder="Search sources ..."
                    />
                </div>
                <Button 
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-white/5"
                >
                <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </CardHeader>
    <CardContent className="p-0">
        <Table>
            <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Name
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Type
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Status
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Last Updated
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i} className="border-white/5">
                            <TableCell>
                                <Skeleton className="h-5 w-32 bg-white/5 hover:bg-white/4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-32 bg-white/5 hover:bg-white/4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-32 bg-white/5 hover:bg-white/4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-32 bg-white/5 hover:bg-white/4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-32 bg-white/5 hover:bg-white/4" />
                            </TableCell>
                        </TableRow>
                    ))
                ) : sources.length > 0 ? (
                    sources.map((source, index) => (
                        <TableRow
                        key={index}
                        className="border-white/5 hover:bg-white/2 cursor-pointer group transition-colors"
                        onClick={() => onSourceClick(source)}
                        >
                            <TableCell className="font-medium text-zinc-200 group-hover:text-white">
                                <div className="flex items-center gap-3">
                                    {getTypeIcon(source.type as SourceType)}
                                    <div className="flex flex-col">
                                        <span>{source.name}</span>
                                        {source.source_url && (
                                            <span className="text-xs text-zinc-500 font-normal">
                                                {source.source_url}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="capitalize text-zinc-400">
                                {source.type}
                            </TableCell>
                            <TableCell className="capitalize text-zinc-400">
                                {getStatusBadge(source.status as SourceStatus)}
                            </TableCell>
                            <TableCell className="capitalize text-zinc-400">
                                {source.last_updated && new Date(source.last_updated).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-zinc-400 hover:text-white hover:bg-white/2"
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                        colSpan={5}
                        className="h-32 text-center text-zinc-500"
                        >
                            No Knowledge sources added yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </CardContent>
    </Card>;
}

export default KnowledgeTable
