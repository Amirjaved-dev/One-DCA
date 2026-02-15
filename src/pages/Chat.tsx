import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatNavbar } from "@/components/chat/ChatNavbar";
import { StrategyPreview } from "@/components/chat/StrategyPreview";
import { useAuth } from "@/context/AuthContext";

export default function Chat() {
    const { userId } = useAuth();

    // ProtectedRoute handles auth check, so userId should exist here (or fetching)
    // But safely handle the type just in case
    if (!userId) return null;

    return (
        <div className="bg-surface-black text-white font-sans h-screen w-screen overflow-hidden flex flex-col selection:bg-silver-accent selection:text-black">
            <div className="noise-overlay"></div>
            <div className="absolute inset-0 z-0 bg-grid-pattern bg-[length:40px_40px] opacity-20 pointer-events-none"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-t from-active-green/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

            <ChatNavbar />

            <main className="relative z-10 flex-1 w-full flex overflow-hidden">
                <div className="w-full md:w-[55%] flex flex-col border-r border-border-subtle h-full">
                    <ChatInterface userId={userId} />
                </div>
                <StrategyPreview />
            </main>

            <footer className="fixed bottom-0 left-0 w-full z-20 px-4 py-2 bg-surface-black border-t border-border-subtle flex justify-between items-center">
                <div className="flex gap-6 text-[10px] tracking-wide text-silver-dim font-mono">
                    <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500"></span> SYSTEM OPERATIONAL</span>
                    <span className="hidden md:inline">VERSION 2.4.1 (STABLE)</span>
                </div>
                <div className="flex gap-4 text-[10px] font-mono text-silver-dim">
                    <span>UPTIME: 99.99%</span>
                    <span className="text-white opacity-50">ENCRYPTED CONNECTION</span>
                </div>
            </footer>
        </div>
    );
}
