import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { MessageBubble } from "./MessageBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

    const handleConfirm = () => {
        // Placeholder for confirmation logic
        console.log("Schedule Confirmed!");
        // We would likely call another mutation here to actually create the schedule
    };

    const handleCancel = () => {
        console.log("Schedule Cancelled!");
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-xl overflow-hidden bg-background shadow-lg">
            {/* Header */}
            <div className="p-4 border-b bg-muted/30">
                <h2 className="font-semibold flex items-center gap-2">
                    <span className="text-xl">🤖</span> DCA Agent
                </h2>
                <p className="text-xs text-muted-foreground">Ask me to start investing for you.</p>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                    {loadMessages === undefined ? (
                        <div className="flex justify-center py-8 text-muted-foreground">
                            <Loader2 className="animate-spin h-6 w-6" />
                        </div>
                    ) : loadMessages.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No messages yet.</p>
                            <p className="text-sm">Try saying "Buy $10 of SUI weekly"</p>
                        </div>
                    ) : (
                        loadMessages.map((msg) => (
                            <MessageBubble
                                key={msg._id}
                                role={msg.role as "user" | "assistant"}
                                content={msg.body}
                                intent={msg.intent}
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                            />
                        ))
                    )}
                    {isSending && (
                        <div className="flex w-full mb-4 justify-start">
                            <div className="flex max-w-[80%] gap-3 flex-row">
                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                    <Bot className="h-4 w-4" />
                                </div>
                                <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm px-4 py-3 flex items-center">
                                    <span className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        disabled={isSending}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={isSending || !inputValue.trim()} size="icon">
                        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Helper icons needed for this file
import { Bot, User as UserIcon } from "lucide-react"; 
