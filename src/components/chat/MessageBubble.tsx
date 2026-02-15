import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Bot, User } from "lucide-react";

interface MessageBubbleProps {
    role: "user" | "assistant";
    content: string;
    intent?: {
        type: string;
        data: any;
    };
    onConfirm?: () => void;
    onCancel?: () => void;
}

export function MessageBubble({ role, content, intent, onConfirm, onCancel }: MessageBubbleProps) {
    const isAi = role === "assistant";

    return (
        <div className={cn("flex w-full mb-4", isAi ? "justify-start" : "justify-end")}>
            <div className={cn("flex max-w-[80%] md:max-w-[70%] gap-3", isAi ? "flex-row" : "flex-row-reverse")}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        isAi ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                        {isAi ? <Bot size={18} /> : <User size={18} />}
                    </div>
                </div>

                {/* Message Content */}
                <div className="flex flex-col gap-2">
                    <div className={cn(
                        "rounded-2xl px-4 py-3 text-sm",
                        isAi
                            ? "bg-muted text-foreground rounded-tl-sm"
                            : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}>
                        {content}
                    </div>

                    {/* Intent Confirmation Card */}
                    {isAi && intent?.type === "confirm_investment" && (
                        <Card className="w-full bg-card border-border/50 animate-in fade-in slide-in-from-top-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    Confirm Schedule
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-3 text-sm">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-muted-foreground">Token:</div>
                                    <div className="font-bold">{intent.data.token}</div>
                                    <div className="text-muted-foreground">Amount:</div>
                                    <div className="font-bold">${intent.data.amount}</div>
                                    <div className="text-muted-foreground">Frequency:</div>
                                    <div className="font-bold capitalize">{intent.data.frequency}</div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2 pt-0">
                                <Button size="sm" variant="default" className="w-full" onClick={onConfirm}>
                                    <Check className="mr-2 h-4 w-4" /> Confirm
                                </Button>
                                <Button size="sm" variant="outline" className="w-full" onClick={onCancel}>
                                    <X className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
