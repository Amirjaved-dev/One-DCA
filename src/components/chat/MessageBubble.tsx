import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
    role: "user" | "assistant";
    content: string;
    intent?: {
        type: string;
        data: any;
    };
}

export function MessageBubble({ role, content, intent }: MessageBubbleProps) {
    const isAi = role === "assistant";

    if (isAi) {
        return (
            <div className="flex gap-4 max-w-2xl animate-fade-in group">
                <div className="w-8 h-8 rounded-sm bg-surface-zinc border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-silver-accent" />
                </div>
                <div className="space-y-2 w-full">
                    <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-1">Monolith Agent v2.4</div>
                    <p className="text-sm text-silver-accent leading-relaxed font-light">
                        {content}
                    </p>

                    {/* Placeholder for visual blocks if intent warrants it, matching the design's "Processing Strategy" box */}
                    {intent && (
                        <div className="mt-2 text-xs text-active-green font-mono border border-active-green/20 bg-active-green-dim px-3 py-2 rounded-sm inline-block">
                            Intent Detected: {intent.type}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse group">
            <div className="w-8 h-8 rounded-sm bg-white text-black flex items-center justify-center flex-shrink-0 mt-1">
                <User className="h-4 w-4 text-black" />
            </div>
            <div className="space-y-2 text-right">
                <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-1">User Command</div>
                <div className="inline-block text-left bg-surface-panel border border-white/10 p-4 rounded-sm rounded-tr-none">
                    <p className="text-sm text-white leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}
