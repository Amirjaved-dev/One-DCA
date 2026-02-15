import { ConnectButton } from "@onelabs/dapp-kit";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ChatNavbar() {
    const location = useLocation();

    const navItems = [
        { label: "DASHBOARD", path: "/dashboard", active: location.pathname === '/dashboard' },
        { label: "TERMINAL", path: "/chat", active: location.pathname === '/chat' },
        { label: "ASSETS", path: "/assets", active: location.pathname === '/assets' },
        { label: "SETTINGS", path: "/settings", active: location.pathname === '/settings' }
    ];

    return (
        <nav className="relative z-20 w-full px-8 py-5 border-b border-border-subtle flex justify-between items-center bg-surface-black/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-white"></div>
                    <span className="font-display font-bold tracking-widest text-lg text-white">MONOLITH</span>
                </div>
                <div className="h-4 w-px bg-white/10 mx-2"></div>
                <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-active-green animate-pulse"></span>
                    <span className="text-[10px] font-mono text-silver-accent tracking-wider uppercase">Agent Active</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 text-xs font-display tracking-widest text-silver-dim">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={cn(
                                "cursor-pointer transition-colors",
                                item.active ? "text-white border-b border-white pb-0.5" : "hover:text-white"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
}
