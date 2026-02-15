import { ChatInterface } from "@/components/chat/ChatInterface";
import { useAuth } from "@/context/AuthContext";

export default function Chat() {
    const { userId } = useAuth();

    // ProtectedRoute handles auth check, so userId should exist here (or fetching)
    // But safely handle the type just in case
    if (!userId) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 container mx-auto p-4 flex flex-col items-center justify-center">
                <ChatInterface userId={userId} />
            </main>
        </div>
    );
}
