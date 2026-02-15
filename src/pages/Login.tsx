import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ConnectButton } from "@onelabs/dapp-kit";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    return (
        <div className="bg-surface-black text-white font-sans min-h-screen w-full flex flex-col items-center justify-center selection:bg-silver-accent selection:text-black overflow-hidden relative">
            <div className="noise-overlay"></div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 grid-bg bg-grid-pattern"></div>
            <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="relative w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] animate-spin-slow opacity-20">
                    <div className="absolute inset-0 border border-white/5 rounded-full transform rotate-45 scale-90"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full transform -rotate-12 scale-75"></div>
                    <div className="absolute inset-0 border border-white/10 rounded-full transform rotate-90 scale-50 border-dashed"></div>
                </div>
            </div>

            <nav className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-white"></div>
                    <span className="font-display font-bold tracking-widest text-sm text-white">MONOLITH</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-medium text-silver-dim uppercase tracking-wider">Terminal Active</span>
                </div>
            </nav>

            <main className="relative z-10 w-full max-w-md px-6">
                <div className="glass-panel p-1 rounded-sm">
                    <div className="bg-surface-black/80 p-8 md:p-10 border border-white/5 rounded-sm flex flex-col items-center text-center">
                        <div className="mb-6">
                            <span className="material-symbols-outlined text-4xl text-white/80 font-light">fingerprint</span>
                        </div>
                        <h1 className="font-display text-2xl font-medium tracking-tight text-white mb-2">
                            Identity Verification
                        </h1>
                        <p className="text-silver-dim text-xs font-mono tracking-wide mb-10 max-w-[280px]">
                            Connect your wallet to access the Monolith autonomous execution layer.
                        </p>

                        <div className="w-full flex justify-center mb-8">
                            <ConnectButton className="w-full group relative bg-white hover:bg-silver-accent transition-colors py-4 px-6 flex items-center justify-center gap-3" />
                        </div>

                        {/* REMOVED MANUAL PROVIDER LIST AS CONNECT BUTTON HANDLES IT */}

                        <div className="mt-8 pt-4 border-t border-white/5 w-full flex justify-between items-center">
                            <a className="text-[10px] text-silver-dim/60 hover:text-white transition-colors font-mono uppercase tracking-wider" href="#">Trouble connecting?</a>
                            <a className="text-[10px] text-silver-dim/60 hover:text-white transition-colors font-mono uppercase tracking-wider" href="#">Docs</a>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 w-full border-t border-white/5 bg-surface-black/95 backdrop-blur-sm z-20">
                <div className="w-full px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-wider text-silver-dim">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span>SYSTEM: ONLINE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">dns</span>
                            <span>BLOCK HEIGHT: 18,492,024</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">security</span>
                            <span>ENCRYPTION: AES-256</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">wifi</span>
                            <span>NODES: 42/42</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
