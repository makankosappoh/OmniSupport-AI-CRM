"use client"

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import QuickActions from '@/components/dashboard/knowledge/quickActions'
import AddKnowledgeModal from '@/components/dashboard/knowledge/addKnowledgeModal'
import KnowledgeTable from '@/components/dashboard/knowledge/KnowledgeTable'


import React from 'react'


const Page = () => {

    const [defaultTab, setDefaultTab] = useState('website');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [knowledgeStoringLoader, setKnowledgeStoringLoader] = useState(false);
    const [knowledgeSourcesLader, setKnowledgeSourcesLader] = useState(true);
    const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(
        []
    );
    const [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openModal = (tab: string) => {
            setDefaultTab(tab);
            setIsAddOpen(true);
    };

    const handleImportSources = async (data: any) => {
        setKnowledgeStoringLoader(true);
        try{
            let response;
            if(data.type === "upload" && data.file){
                const formData = new FormData();
                formData.append("type", data.type);
                formData.append("file", data.file);
                response = await fetch("/api/knowledge/store", {
                    method: "POST",
                    body: formData,
                });
            } else {
                response = await fetch("/api/knowledge/store", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            }

            if(!response.ok) throw new Error("Failed to store knowledge source"); 
            const res = await fetch("/api/knowledge/fetch");
            const newData = await res.json();
            setKnowledgeSources(newData.sources);
            setIsAddOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setKnowledgeStoringLoader(false);
        }
    };

    const handleSourceClick = (source: KnowledgeSource) => {
        setSelectedSource(source);
        setIsSheetOpen(true);
    }

    return (
    <div className='p-6 md:p-8 space-y-8 max-7xl mx-auto animate-in fade-in duration-500'> 
        <div className="flex flex-col md:flex-row items-start justify-between md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-semi-bold text-white tracking-tight">
                    Knowledge Base
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                    Manage your website sources, documents, and uploads here.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                onClick={() => openModal("website")}
                className='bg-white text-black hover:bg-zinc-200'
                >
                <Plus className="w-4 h-4 mr-2" />
                Add Knowledge
                </Button>
            </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onOpenModal={openModal} />

        <KnowledgeTable 
        sources={knowledgeSources}
        onSourceClick={handleSourceClick}
        isLoading={knowledgeSourcesLader}
        
        />

        <AddKnowledgeModal
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        defaultTab={defaultTab}
        setDefaultTab={setDefaultTab}
        onImport={handleImportSources}
        isLoading={knowledgeStoringLoader}
        existingSources={knowledgeSources}
        
        />
    </div>
    )
}

export default Page
