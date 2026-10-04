import { Button } from '@/components/ui/button'
import { File, Globe, Upload } from 'lucide-react';
import React from 'react'

const QuickActions = ({onOpenModal,}:{onOpenModal: (tab:string) => void;}) => {
return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button
        variant="outline"
        className="h-auto py-8 px-6 flex items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/2 hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal"
        onClick={() => onOpenModal("website")}
        >
        <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
        <Globe className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="space-y-1.5 text-center w-full">
            <span className="text-sm font-medium block whitespace-normal">
                Add Website
            </span>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
                Add your website or specific pages to automatically keep your knowledge base sync 
            </p>
        </div>
        </Button>
        <Button
        variant="outline"
        className="h-auto py-8 px-6 flex items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/2 hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal"
        onClick={() => onOpenModal("upload")}
        >
        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
        <Upload className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="space-y-1.5 text-center w-full">
            <span className="text-sm font-medium block whitespace-normal">
                Upload Files
            </span>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
                Upload CSV files to instantly train yur assistant with existing documents.
            </p>
        </div>
        </Button>
        <Button
        variant="outline"
        className="h-auto py-8 px-6 flex items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/2 hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal"
        onClick={() => onOpenModal("text")}
        >
        <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
        <File className="w-6 h-6 text-blue-400" />
        </div>
        <div className="space-y-1.5 text-center w-full">
            <span className="text-sm font-medium block whitespace-normal">
                Add Manual Text
            </span>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
                Manually copy-pasted FAQs, internal doc notes, or policies directly into the knowledge base.
            </p>
        </div>
        </Button>
    </div>
)
}

export default QuickActions
