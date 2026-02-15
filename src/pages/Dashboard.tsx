import { Link } from 'react-router-dom';
import { MonolithLayout } from '@/components/layout/MonolithLayout';

export default function Dashboard() {
    return (
        <MonolithLayout>
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="font-display text-3xl text-white mb-2">Command Center</h1>
                    <p className="text-silver-dim font-light tracking-wide text-sm">Real-time overview of autonomous agent performance and asset allocation.</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/chat" className="px-4 py-2 bg-active-green text-black text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">add_circle</span>
                        New Strategy
                    </Link>
                </div>
            </header>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
                    </div>
                    <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-2">Total Value Locked</div>
                    <div className="text-2xl font-display text-white mb-1">$12,450.00</div>
                    <div className="text-xs text-active-green flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        +2.4% (24h)
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-4xl">smart_toy</span>
                    </div>
                    <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-2">Active Agents</div>
                    <div className="text-2xl font-display text-white mb-1">3 / 5</div>
                    <div className="text-xs text-silver-dim">All systems operational</div>
                </div>

                <div className="glass-panel p-6 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-4xl">payments</span>
                    </div>
                    <div className="text-[10px] font-mono text-silver-dim uppercase tracking-wider mb-2">Realized Profit</div>
                    <div className="text-2xl font-display text-white mb-1">0.45 ETH</div>
                    <div className="text-xs text-active-green">~$1,150.00</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Strategies */}
                <div className="col-span-1 lg:col-span-2 glass-panel border border-white/5 rounded-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-surface-black/40">
                        <h2 className="text-sm font-display uppercase tracking-widest text-white">Active Strategies</h2>
                        <button className="text-[10px] text-silver-dim hover:text-white uppercase tracking-wider transition-colors">View All</button>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-[10px] uppercase text-silver-dim font-mono">
                                <tr>
                                    <th className="px-6 py-3 font-normal">Strategy ID</th>
                                    <th className="px-6 py-3 font-normal">Type</th>
                                    <th className="px-6 py-3 font-normal">Asset Pair</th>
                                    <th className="px-6 py-3 font-normal">Performance</th>
                                    <th className="px-6 py-3 font-normal text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-silver-dim">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-white">#8821</td>
                                    <td className="px-6 py-4">Recurring Buy</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <div className="flex -space-x-1">
                                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                                        </div>
                                        USDC <span className="text-xs opacity-50">→</span> ETH
                                    </td>
                                    <td className="px-6 py-4 text-active-green">+12.4%</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-active-green-dim border border-active-green/20 text-[10px] text-active-green uppercase font-bold tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-active-green animate-pulse"></span>
                                            Running
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-white">#8824</td>
                                    <td className="px-6 py-4">Dip Sniper</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <div className="flex -space-x-1">
                                            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                                        </div>
                                        BTC
                                    </td>
                                    <td className="px-6 py-4 text-silver-dim">0.0%</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-500 uppercase font-bold tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                            Waiting
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-panel border border-white/5 rounded-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-white/5 bg-surface-black/40">
                        <h2 className="text-sm font-display uppercase tracking-widest text-white">System Logs</h2>
                    </div>
                    <div className="flex-1 p-6 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-px bg-white/10 relative">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-active-green"></div>
                            </div>
                            <div className="pb-2">
                                <div className="text-xs text-silver-dim font-mono mb-1">10:42 AM</div>
                                <div className="text-sm text-white">Strategy #8821 Executed</div>
                                <div className="text-xs text-silver-dim mt-1">Swapped 100 USDC for 0.031 ETH</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-px bg-white/10 relative">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-silver-dim"></div>
                            </div>
                            <div className="pb-2">
                                <div className="text-xs text-silver-dim font-mono mb-1">09:15 AM</div>
                                <div className="text-sm text-white">Wallet Connected</div>
                                <div className="text-xs text-silver-dim mt-1">0x8a...42F9 via MetaMask</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-px bg-white/10 relative">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                            </div>
                            <div className="pb-2">
                                <div className="text-xs text-silver-dim font-mono mb-1">08:00 AM</div>
                                <div className="text-sm text-white">Gas Price Alert</div>
                                <div className="text-xs text-silver-dim mt-1">Mainnet gwei &gt; 45. Execution paused.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MonolithLayout>
    );
}
