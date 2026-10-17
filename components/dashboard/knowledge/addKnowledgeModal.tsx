'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, FileText, Globe, Upload, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface AddKnowledgeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTab: string;
  setDefaultTab: (tab: string) => void;
  onImport: (data: any) => Promise<void>;
  isLoading: boolean;
  existingSources: KnowledgeSource[];
}

const AddKnowledgeModal = ({
  isOpen,
  setIsOpen,
  defaultTab,
  setDefaultTab,
  onImport,
  isLoading,
  existingSources,
}: AddKnowledgeModalProps) => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [docsTitle, setDocsTitle] = useState('');
  const [docsContent, setDocsContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleImportWrapper = async () => {
    setError(null);
    const data: any = { type: defaultTab };
    if (defaultTab === 'website') {
      if (!websiteUrl) {
        setError('Website URL is required');
        return;
      }
      if (!validateUrl(websiteUrl)) {
        setError('Please enter a valid URL (e.g. https://example.com)');
        return;
      }
      const normalizedInput = websiteUrl.replace(/\/$/, '');
      const exists = existingSources.some((source) => {
        if (source.type !== 'website' || !source.source_url) return false;
        const normalizedSource = source.source_url.replace(/\/$/, '');
        return normalizedSource === normalizedInput;
      });

      if (exists) {
        setError('This website is already in your knowledge base.');
        return;
      }
      data.url = websiteUrl;
    } else if (defaultTab === 'text') {
      if (!docsTitle.trim()) {
        setError('Title is required');
        return;
      }
      if (!docsContent.trim()) {
        setError('Content is required');
        return;
      }
      data.title = docsTitle;
      data.content = docsContent;
    } else if (defaultTab === 'upload') {
      if (!uploadedFile) {
        setError('Please select a file to upload');
        return;
      }
      data.file = uploadedFile;
    }
    await onImport(data);
    setWebsiteUrl('');
    setDocsTitle('');
    setDocsContent('');
    setUploadedFile(null);
    setError(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setError(null);
      }}
    >
      <DialogContent className="sm:max-w-[580px] w-full bg-[#0E0E12] border border-zinc-800 text-zinc-100 p-0 rounded-2xl shadow-2xl overflow-hidden gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 text-left">
          <DialogTitle className="text-xl font-semibold text-white tracking-tight">
            Add New Sources
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400 mt-1">
            Choose a content type to train your AI assistant with.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="website"
          value={defaultTab}
          onValueChange={(value) => {
            setDefaultTab(value);
            setError(null);
          }}
          className="w-full flex flex-col"
        >
          {/* Tabs Navigation */}
          <div className="px-6 border-b border-zinc-800/80">
            <TabsList className="bg-transparent h-auto p-0 flex gap-8 border-0 justify-start">
              <TabsTrigger
                value="website"
                className="!bg-transparent !shadow-none border-b-2 border-transparent data-[state=active]:!border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-400 data-[state=active]:!text-white transition-all font-medium hover:text-zinc-200"
              >
                Website
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="!bg-transparent !shadow-none border-b-2 border-transparent data-[state=active]:!border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-400 data-[state=active]:!text-white transition-all font-medium hover:text-zinc-200"
              >
                Q&A / Text
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="!bg-transparent !shadow-none border-b-2 border-transparent data-[state=active]:!border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-400 data-[state=active]:!text-white transition-all font-medium hover:text-zinc-200"
              >
                File Upload
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          <div className="p-6 space-y-4 w-full">
            {error && (
              <Alert variant="destructive" className="w-full bg-red-950/40 border-red-800 text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <AlertDescription className="ml-2 text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Website Tab */}
            <TabsContent
              value="website"
              className="mt-0 space-y-4 w-full animate-in fade-in-50 duration-200"
            >
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex items-start gap-3.5">
                <Globe className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="flex flex-col text-left">
                  <p className="font-medium text-white">Crawl Website</p>
                  <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">
                    Enter the URL of the website you want to crawl or add a specific page link to provide focused content.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-left">
                <Label className="text-xs font-medium text-zinc-300">Website URL *</Label>
                <Input
                  placeholder="https://example.com"
                  className="bg-zinc-900/60 border-zinc-800 focus-visible:border-indigo-500 text-white placeholder:text-zinc-600 rounded-lg h-10 w-full"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
            </TabsContent>

            {/* Q&A / Text Tab */}
            <TabsContent
              value="text"
              className="mt-0 space-y-4 w-full animate-in fade-in-50 duration-200"
            >
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm flex items-start gap-3.5">
                <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="flex flex-col text-left">
                  <p className="font-medium text-white">Raw Text</p>
                  <p className="text-xs text-purple-200/80 mt-1 leading-relaxed">
                    Paste FAQs, internal doc notes, or policies directly into the knowledge base.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-xs font-medium text-zinc-300">Title</Label>
                <Input
                  placeholder="e.g. Refund policy"
                  className="bg-zinc-900/60 border-zinc-800 focus-visible:border-purple-500 text-white placeholder:text-zinc-600 rounded-lg h-10 w-full"
                  value={docsTitle}
                  onChange={(e) => setDocsTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-xs font-medium text-zinc-300">Content</Label>
                <Textarea
                  placeholder="Paste text here..."
                  className="bg-zinc-900/60 border-zinc-800 focus-visible:border-purple-500 text-white placeholder:text-zinc-600 h-32 rounded-lg resize-none w-full"
                  value={docsContent}
                  onChange={(e) => setDocsContent(e.target.value)}
                />
              </div>
            </TabsContent>

            {/* File Upload Tab */}
            <TabsContent
              value="upload"
              className="mt-0 space-y-4 w-full animate-in fade-in-50 duration-200"
            >
              <input
                type="file"
                id="csv-file-input"
                accept=".csv, text/csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 10 * 1024 * 1024) {
                      setError('File size must be less than 10MB');
                      return;
                    }
                    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
                      setError('Only CSV files allowed');
                      return;
                    }
                    setUploadedFile(file);
                    setError(null);
                  }
                }}
              />
              <div
                className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 rounded-xl h-52 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900/50 transition-colors"
                onClick={() => {
                  document.getElementById('csv-file-input')?.click();
                }}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-white">
                  {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-zinc-500 mt-1">CSV (max 10MB)</p>
              </div>
            </TabsContent>
          </div>

          {/* Modal Footer (Buttons stay cleanly aligned inside the card) */}
          <div className="p-4 px-6 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-end gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg text-sm px-4"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-white text-black hover:bg-zinc-200 rounded-lg font-medium px-5 text-sm min-w-[120px]"
              onClick={handleImportWrapper}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                'Import Source'
              )}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddKnowledgeModal;