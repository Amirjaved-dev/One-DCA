import { ConnectButton } from "@onelabs/dapp-kit";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    useAuth(); // Ensure context is consumed if needed, or remove completely if not used.
    // Actually ConnectButton handles itself, so maybe we don't need useAuth here at all?
    // But keeping it for now if we want to show other user info later.
    // For now, just remove destructuring.


    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
                        <span>DCABot</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
                        <Link to="/chat" className="transition-colors hover:text-foreground/80 text-foreground/60">Agent</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <ConnectButton />
                </div>
            </div>
        </header>
    );
}
