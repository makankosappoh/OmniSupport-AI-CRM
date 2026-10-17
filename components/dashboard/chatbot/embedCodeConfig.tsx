import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Code, Copy } from "lucide-react";

const EmbedCodeConfig = ({ chatbotId }: { chatbotId: string | undefined }) => {
  const [copied, setCopied] = useState(false);

  const snippet = `<script src="https://omnisupportai.com/widget.js" data-id="${chatbotId}" defer></script>`;



  const handleCopyCode = async () => {
    if (!chatbotId) return;
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-white/5 bg-[#0a0a0e] gap-3 py-4">
      <CardHeader className="px-4 pb-0">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-zinc-500" />
          <CardTitle className="text-sm font-medium text-white uppercase tracking-wider">
            Embed Code
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-4 space-y-3">
        <div className="relative">
          <div className="bg-[#050509] border border-white/10 rounded-lg p-3 pr-11">
            <code className="block whitespace-pre overflow-x-auto text-[11px] leading-relaxed text-zinc-300 font-mono">
              {`<script src="https://omnisupportai.com/widget.js" \n  data-id="${
              chatbotId || "..."
              }" \n  defer>\n</script>`}
            </code>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 h-7 w-7 bg-white/10 hover:bg-white/20 text-white border-none"
            onClick={handleCopyCode}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Paste before the closing &lt;/head&gt; tag of your website.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbedCodeConfig;