import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MonolithLayoutProps {
    children: React.ReactNode;
}

export const MonolithLayout: React.FC<MonolithLayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="bg-surface-black text-white font-sans h-screen w-screen overflow-hidden flex flex-col selection:bg-accent-lime selection:text-black">
            {/* Noise Overlay */}
            <div className="noise-overlay"></div>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-accent-lime/5 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-surface-zinc/30 rounded-full blur-[100px]"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-30 h-20 px-8 border-b border-white/5 bg-surface-black/80 backdrop-blur-md flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-accent-lime"></div>
                        <Link to="/" className="font-display font-bold tracking-widest text-lg text-white">MONOLITH</Link>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/dashboard" className={cn(
                            "text-xs font-display uppercase tracking-widest transition-colors",
                            location.pathname === '/dashboard' ? "text-white border-b border-accent-lime pb-1" : "text-silver-dim hover:text-white"
                        )}>Portfolio</Link>
                        <Link to="#" className="text-xs font-display uppercase tracking-widest text-silver-dim hover:text-white transition-colors">Strategies</Link>
                        <Link to="/chat" className="text-xs font-display uppercase tracking-widest text-silver-dim hover:text-white transition-colors">Agents</Link>
                        <Link to="/settings" className={cn(
                            "text-xs font-display uppercase tracking-widest transition-colors",
                            location.pathname === '/settings' ? "text-white border-b border-accent-lime pb-1" : "text-silver-dim hover:text-white"
                        )}>Settings</Link>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex flex-col items-end">
                        <span className="text-[10px] text-silver-dim tracking-wider uppercase">Security Level</span>
                        <span className="font-display font-medium text-accent-lime">HIGH</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden lg:block"></div>
                    <div className="flex items-center gap-3 bg-surface-zinc border border-white/10 rounded-full px-4 py-1.5 hover:border-white/20 transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse"></div>
                        <span className="text-xs font-mono text-silver-accent">0x8a...42F9</span>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="relative z-10 w-full h-full pt-20 flex">
                {/* Sidebar */}
                <aside className="w-64 hidden lg:flex flex-col border-r border-white/5 bg-surface-black/50 p-6 gap-8">
                    <div>
                        <h3 className="text-xs font-display uppercase tracking-widest text-silver-dim mb-4">Configuration</h3>
                        <div className="space-y-1">
                            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded bg-white/5 text-white border-l-2 border-accent-lime">
                                <span className="material-symbols-outlined text-sm">security</span>
                                <span className="text-sm">Security & Gas</span>
                            </Link>
                            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded text-silver-dim hover:text-white hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                                <span className="text-sm">Wallets</span>
                            </Link>
                            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded text-silver-dim hover:text-white hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-sm">notifications</span>
                                <span className="text-sm">Notifications</span>
                            </Link>
                            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded text-silver-dim hover:text-white hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-sm">api</span>
                                <span className="text-sm">API Access</span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="glass-panel p-4 rounded border border-accent-red/20 bg-accent-red-dim/5">
                            <div className="flex items-center gap-2 mb-2 text-accent-red">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold">Alert</span>
                            </div>
                            <p className="text-xs text-silver-dim leading-relaxed">
                                Unusual gas spike detected on Ethereum Mainnet. Agent activity paused.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Page Content */}
                <section className="flex-1 overflow-y-auto p-8">
                    {children}
                </section>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-full z-20 px-8 py-2 bg-surface-black/90 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-wide text-silver-dim font-sans h-full">
                    <div className="flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse"></span>
                        <span>SYSTEM SECURE</span>
                        <span className="mx-2 text-white/10">|</span>
                        <span>LATEST BLOCK: 18459203</span>
                    </div>
                    <div className="opacity-50">
                        ENCRYPTED SESSION ID: <span className="font-mono text-white">8F3-A29-X01</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
