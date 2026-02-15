import { Check } from "lucide-react";

export function StrategyPreview() {
    return (
        <div className="hidden md:block w-[45%] bg-surface-panel/30 p-8 overflow-y-auto h-full border-l border-border-subtle">
            <div className="h-full flex flex-col gap-6">
                <div className="flex justify-between items-end pb-4 border-b border-border-subtle">
                    <div>
                        <div className="text-[10px] font-mono text-active-green mb-1">PREVIEW MODE</div>
                        <h2 className="text-2xl font-display font-light text-white">Strategy #8821</h2>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-white/10 text-[10px] uppercase tracking-wider text-silver-accent hover:bg-white/5 transition-colors">Edit</button>
                        <button className="px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-wider hover:bg-silver-accent transition-colors flex items-center gap-2">
                            Confirm <Check size={12} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
                    <div className="bg-surface-panel p-4">
                        <div className="text-[10px] text-silver-dim uppercase tracking-wider mb-1">Action</div>
                        <div className="text-white font-mono text-sm">Recurring Swap</div>
                    </div>
                    <div className="bg-surface-panel p-4">
                        <div className="text-[10px] text-silver-dim uppercase tracking-wider mb-1">Asset Pair</div>
                        <div className="text-white font-mono text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> USDC
                            <span className="text-silver-dim">→</span>
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> ETH
                        </div>
                    </div>
                    <div className="bg-surface-panel p-4">
                        <div className="text-[10px] text-silver-dim uppercase tracking-wider mb-1">Amount</div>
                        <div className="text-white font-mono text-sm">$100.00 / week</div>
                    </div>
                    <div className="bg-surface-panel p-4">
                        <div className="bg-active-green-dim border border-active-green/20 px-2 py-0.5 inline-block rounded text-[10px] text-active-green mb-1">ESTIMATED</div>
                        <div className="text-white font-mono text-sm">~0.031 ETH</div>
                    </div>
                </div>

                <div className="flex-1 bg-surface-black border border-white/5 p-6 rounded-sm relative overflow-hidden group min-h-[300px]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="text-sm text-white font-display">Projected Accumulation</div>
                            <div className="text-[10px] text-silver-dim mt-1">1 Year Outlook based on current volatility</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-display text-white">+5.2 ETH</div>
                            <div className="text-[10px] text-active-green">+12.4% APY (Est)</div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 top-24 px-6 pb-6">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                            <line stroke="#333" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="40" y2="40"></line>
                            <line stroke="#333" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="80" y2="80"></line>
                            <line stroke="#333" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="120" y2="120"></line>
                            <line stroke="#333" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="160" y2="160"></line>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#00FF94" stopOpacity="0.2"></stop>
                                    <stop offset="100%" stopColor="#00FF94" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,180 C50,170 100,165 150,150 C200,135 250,140 300,100 C350,60 380,50 400,30 V200 H0 Z" fill="url(#chartGradient)"></path>
                            <path className="chart-line" d="M0,180 C50,170 100,165 150,150 C200,135 250,140 300,100 C350,60 380,50 400,30" fill="none" stroke="#00FF94" strokeWidth="2"></path>
                            <circle className="animate-pulse" cx="400" cy="30" fill="#fff" r="4"></circle>
                        </svg>
                    </div>
                    <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[9px] text-silver-dim font-mono uppercase">
                        <span>Now</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                        <span>Next Year</span>
                    </div>
                </div>

                <div className="border-t border-border-subtle pt-4 flex justify-between items-center text-[10px] text-silver-dim font-mono">
                    <div>SMART CONTRACT AUDITED</div>
                    <div className="flex items-center gap-2">
                        <span>GAS: 14 GWEI</span>
                        <div className="w-px h-3 bg-white/10"></div>
                        <span className="text-white">READY TO SIGN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
