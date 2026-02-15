import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, ShieldAlert, Activity, ExternalLink } from "lucide-react";

export function AgentStatus() {
    const sentiment = useQuery(api.agent.api.getLatestSentiment, { tokenSymbol: "ETH" });
    const logs = useQuery(api.agent.api.getRecentLogs, {});

    if (!sentiment) return <div className="text-muted-foreground animate-pulse">Connecting to Guardian...</div>;

    const isHighRisk = sentiment.riskScore > 7;

    return (
        <div className="space-y-6">
            {/* 1. Main Status Card */}
            <Card className={`border-l-4 ${isHighRisk ? "border-l-red-500" : "border-l-green-500"}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Guardian Agent Status
                    </CardTitle>
                    {isHighRisk ? (
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                    ) : (
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-2">
                        {isHighRisk ? "High Risk Detected" : "Market Healthy"}
                        <Badge variant={isHighRisk ? "destructive" : "outline"}>
                            Risk Score: {sentiment.riskScore}/10
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {sentiment.summary}
                    </p>
                    <div className="mt-4 text-xs flex gap-2">
                        {sentiment.sourceUrls.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline text-blue-500">
                                Source {i + 1} <ExternalLink className="h-3 w-3" />
                            </a>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 2. Agent Brain Logs */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Activity className="h-4 w-4" /> Agent Activity Log
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        <div className="space-y-4">
                            {logs?.map((log) => (
                                <div key={log._id} className="flex flex-col gap-1 border-b pb-2 last:border-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold">{log.type}</span>
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(log.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-sm">{log.message}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
