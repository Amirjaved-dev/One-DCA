import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-surface-black text-white font-sans min-h-screen w-full flex flex-col items-center selection:bg-silver-accent selection:text-black overflow-x-hidden">
            <div className="noise-overlay"></div>
            <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="relative w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] animate-spin-slow opacity-30">
                    <div className="absolute inset-0 border border-white/5 rounded-full transform rotate-45 scale-90"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full transform -rotate-12 scale-75"></div>
                    <div className="absolute inset-0 border border-white/10 rounded-full transform rotate-90 scale-50 border-dashed"></div>
                </div>
            </div>

            <nav className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex justify-between items-center border-b border-white/5 bg-surface-black/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-white"></div>
                    <span className="font-display font-bold tracking-widest text-base text-white">MONOLITH</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a className="text-[10px] font-display font-medium tracking-[0.2em] text-silver-dim hover:text-white transition-colors uppercase cursor-pointer">Intelligence</a>
                    <a className="text-[10px] font-display font-medium tracking-[0.2em] text-silver-dim hover:text-white transition-colors uppercase cursor-pointer">Network</a>
                    <a className="text-[10px] font-display font-medium tracking-[0.2em] text-silver-dim hover:text-white transition-colors uppercase cursor-pointer">Protocol</a>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="group border border-white/20 px-6 py-2 text-[10px] font-display font-bold uppercase tracking-[0.15em] bg-white/5 hover:bg-white hover:text-black transition-all"
                    >
                        Connect Wallet
                    </button>
                </div>
            </nav>

            <main className="relative z-10 w-full flex flex-col items-center pt-32 md:pt-48 pb-20 px-6">
                <div className="w-full max-w-5xl flex flex-col items-center text-center mb-32 md:mb-48">
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver-dim">Autonomous Grid Active</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-8xl font-medium tracking-tighter text-white mb-8 leading-[0.9]">
                        Command<br /><span className="text-silver-dim/50">Your Chain.</span>
                    </h1>
                    <p className="text-silver-dim text-sm md:text-base font-light tracking-wide max-w-xl mb-12 leading-relaxed">
                        The autonomous intelligence layer for high-precision Web3 tasks. Execute complex strategies with singular intent and mathematical perfection.
                    </p>
                    <div className="w-full max-w-3xl glass-panel p-1 rounded-sm shadow-2xl animate-float">
                        <div className="bg-surface-black/95 p-6 border border-white/5 rounded-sm h-[360px] flex flex-col text-left relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5 z-10">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                                </div>
                                <div className="text-[10px] font-mono text-silver-dim uppercase tracking-widest">root@monolith: ~</div>
                            </div>
                            <div className="flex-1 font-mono text-xs md:text-sm space-y-3 overflow-y-auto terminal-scroll text-silver-dim z-10 font-light">
                                <div className="flex gap-3">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-white">init_sequence --mode=autonomous</span>
                                </div>
                                <div className="pl-6 text-silver-dim opacity-70 border-l border-white/10 ml-1.5">
                                    [OK] Core logic loaded.<br />
                                    [OK] Neural engine connected to mainnet.
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-white">scan_opportunities --depth=full</span>
                                </div>
                                <div className="pl-6 text-silver-dim opacity-70 border-l border-white/10 ml-1.5">
                                    [SCANNING] eth_mainnet block 18492021...<br />
                                    [FOUND] Arb opportunity detected (confidence: 98.4%)<br />
                                    [CALC] Estimated yield: 0.45 ETH
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-white">execute_flash --gas=optimal</span>
                                </div>
                                <div className="pl-6 text-silver-dim opacity-70 border-l border-white/10 ml-1.5">
                                    [TX] Transaction broadcast: 0x8a9...c4b<br />
                                    [SUCCESS] Block included.
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-white">awaiting_input<span className="animate-cursor inline-block w-2 h-4 bg-white align-middle ml-1"></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-6xl mx-auto py-20 flex flex-col gap-32 md:gap-48">
                    <div className="hidden md:block step-line"></div>

                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="md:w-1/2 flex justify-center md:justify-end order-2 md:order-1">
                            <div className="relative w-full max-w-sm aspect-square bg-surface-zinc/30 border border-white/10 rounded-sm p-8 flex flex-col items-center justify-center overflow-hidden group hover:border-white/30 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 w-full h-full border border-white/5 rounded-sm p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-[10px] text-silver-dim uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
                                        <span>Analysis Module</span>
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center gap-4">
                                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative">
                                            <span className="material-symbols-outlined text-white/50 text-2xl">hub</span>
                                            <div className="absolute inset-0 border border-white/40 rounded-full animate-ping opacity-20"></div>
                                        </div>
                                        <div className="h-px w-12 bg-white/20"></div>
                                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                                            <span className="material-symbols-outlined text-white text-2xl">token</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto grid grid-cols-3 gap-2">
                                        <div className="h-1 bg-white/20 rounded-full"></div>
                                        <div className="h-1 bg-white/10 rounded-full"></div>
                                        <div className="h-1 bg-white/5 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 text-left order-1 md:order-2 pl-8 border-l border-white/10 md:border-l-0">
                            <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-4">Step 01</div>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Multi-chain Analysis</h2>
                            <p className="text-silver-dim text-sm leading-relaxed max-w-md">
                                Our sentinel nodes continuously monitor mempools across 12+ EVM chains. By analyzing liquidity depth and volatility in real-time, the system identifies profitable execution paths before they become public.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver-dim/80">
                                    <span className="material-symbols-outlined text-sm">memory</span>
                                    <span>Mem-pool scanning</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver-dim/80">
                                    <span className="material-symbols-outlined text-sm">speed</span>
                                    <span>&lt;10ms Latency</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="md:w-1/2 text-left pl-8 border-l border-white/10 md:border-l-0 md:text-right md:pr-8">
                            <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-4">Step 02</div>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Flash Execution</h2>
                            <p className="text-silver-dim text-sm leading-relaxed max-w-md ml-auto">
                                Once a path is confirmed, the AI constructs and signs the transaction bundle instantly. Utilizing Flashbots and private RPCs, we bypass public mempool predation, ensuring your transaction is mined exactly as intended.
                            </p>
                            <div className="mt-8 flex gap-4 md:justify-end">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver-dim/80">
                                    <span className="material-symbols-outlined text-sm">flash_on</span>
                                    <span>MEV Protection</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver-dim/80">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                    <span>Private RPC</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center md:justify-start">
                            <div className="relative w-full max-w-sm aspect-square bg-surface-zinc/30 border border-white/10 rounded-sm p-8 flex flex-col items-center justify-center overflow-hidden group hover:border-white/30 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 w-full bg-surface-black border border-white/10 p-4 font-mono text-[10px] leading-relaxed text-silver-dim shadow-2xl">
                                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                                        <span className="material-symbols-outlined text-green-500 text-sm">code</span>
                                        <span className="uppercase tracking-wider text-white">Execution_Block</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span>Function:</span>
                                            <span className="text-white">swapExactTokens</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Path:</span>
                                            <span className="text-white">[USDC, WETH, WBTC]</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Gas Price:</span>
                                            <span className="text-green-400">24 gwei</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Slippage:</span>
                                            <span className="text-red-400">0.5%</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-white/40">Status</span>
                                        <span className="bg-green-900/20 text-green-400 px-2 py-0.5 rounded text-[9px] uppercase border border-green-900/30">Confirmed</span>
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="md:w-1/2 flex justify-center md:justify-end order-2 md:order-1">
                            <div className="relative w-full max-w-sm aspect-square bg-surface-zinc/30 border border-white/10 rounded-sm p-8 flex flex-col items-center justify-center overflow-hidden group hover:border-white/30 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative">
                                        <div className="absolute inset-0 rounded-full border border-green-500/20 border-t-green-500 animate-spin"></div>
                                        <span className="material-symbols-outlined text-white text-4xl">verified_user</span>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <div className="text-2xl font-display font-bold text-white tracking-widest">SETTLED</div>
                                        <div className="text-[10px] font-mono text-silver-dim mt-1">BLOCK #18239402</div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[9px] uppercase tracking-widest text-silver-dim/50 font-mono">
                                    <span>Hash: 0x8a...3f</span>
                                    <span>Time: 0.4s</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 text-left order-1 md:order-2 pl-8 border-l border-white/10 md:border-l-0">
                            <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-4">Step 03</div>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Verified Settlement</h2>
                            <p className="text-silver-dim text-sm leading-relaxed max-w-md">
                                Execution is only the beginning. The system verifies finality across all involved chains, ensuring assets are settled securely in your wallet. Real-time notifications confirm the outcome of every automated action.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver-dim/80">
                                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    <span>On-chain Proof</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver-dim/80">
                                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                                    <span>Instant Alerts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-4xl py-24 text-center">
                    <h2 className="font-display text-4xl font-medium text-white mb-8">Ready to deploy?</h2>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-white text-black px-12 py-4 text-sm font-display font-bold uppercase tracking-[0.2em] hover:bg-silver-accent transition-colors"
                    >
                        Connect Wallet
                    </button>
                </div>
            </main>

            <footer className="w-full border-t border-white/5 bg-surface-black/95 backdrop-blur-sm z-20 sticky bottom-0">
                <div className="w-full px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-wider text-silver-dim">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span>SYSTEM: ONLINE</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">dns</span>
                            <span>ETH BLOCK: 18,492,024</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">speed</span>
                            <span>LATENCY: 12ms</span>
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
