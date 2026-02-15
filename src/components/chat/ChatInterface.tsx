import { useState, useRef, useEffect } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { MessageBubble } from "./MessageBubble";
import { Loader2, Bot } from "lucide-react";

interface ChatInterfaceProps {
    userId: string; // We'll pass this in for now
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
    const [inputValue, setInputValue] = useState("");
    const loadMessages = useQuery(api.chat.list, { userId });
    const sendMessage = useAction(api.chat.sendMessage);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isSending, setIsSending] = useState(false);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [loadMessages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const text = inputValue;
        setInputValue(""); // Optimistic clear
        setIsSending(true);

        try {
            await sendMessage({ userId, body: text });
        } catch (error) {
            console.error("Failed to send message:", error);
            // Ideally show toast here
        } finally {
            setIsSending(false);
        }
    };





    return (
        <>
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {loadMessages === undefined ? (
                    <div className="flex justify-center py-8 text-muted-foreground">
                        <Loader2 className="animate-spin h-6 w-6" />
                    </div>
                ) : loadMessages.length === 0 ? (
                    <div className="flex gap-4 max-w-2xl animate-fade-in">
                        <div className="w-8 h-8 rounded-sm bg-surface-zinc border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-silver-accent" />
                        </div>
                        <div className="space-y-4 w-full">
                            <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-1">Monolith Agent v2.4</div>
                            <p className="text-sm text-silver-accent leading-relaxed font-light">
                                Systems initialized. Connected to Ethereum Mainnet via private RPC.
                                Ready for autonomous execution. What strategy shall we deploy today?
                            </p>
                        </div>
                    </div>
                ) : (
                    loadMessages.map((msg) => (
                        <MessageBubble
                            key={msg._id}
                            role={msg.role as "user" | "assistant"}
                            content={msg.body}
                            intent={msg.intent}
                        />
                    ))
                )}
                {isSending && (
                    <div className="flex gap-4 max-w-2xl animate-fade-in">
                        <div className="w-8 h-8 rounded-sm bg-surface-zinc border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-active-green" />
                        </div>
                        <div className="space-y-4 w-full">
                            <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-1">Monolith Agent v2.4 • <span className="text-active-green">Processing Strategy</span></div>
                            <p className="text-sm text-silver-accent leading-relaxed font-light flex items-center gap-2">
                                Analyzing request parameters...
                                <span className="flex gap-1">
                                    <span className="w-1 h-1 bg-active-green rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1 h-1 bg-active-green rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1 h-1 bg-active-green rounded-full animate-bounce"></span>
                                </span>
                            </p>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            <div className="p-6 border-t border-border-subtle bg-surface-black/50 backdrop-blur-sm">
                <div className="relative">
                    <input
                        className="w-full bg-surface-zinc border border-white/10 text-white p-4 pl-4 pr-12 rounded-sm focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all font-light placeholder:text-silver-dim/50 text-sm"
                        placeholder="Confirm execution or modify parameters..."
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        disabled={isSending}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isSending || !inputValue.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-sm transition-colors text-silver-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="material-symbols-outlined text-lg">arrow_upward</span>}
                    </button>
                </div>
                <div className="flex justify-between mt-3 px-1">
                    <div className="flex gap-4 text-[10px] font-mono text-silver-dim uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-active-green rounded-full"></div> Mainnet</span>
                        <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-silver-dim rounded-full"></div> Latency: 12ms</span>
                    </div>
                    <div className="text-[10px] text-silver-dim font-display tracking-widest">
                        PRESS ENTER TO SEND
                    </div>
                </div>
            </div>
        </>
    );
}


