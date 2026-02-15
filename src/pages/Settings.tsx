import { useState } from 'react';
import { MonolithLayout } from '@/components/layout/MonolithLayout';
import { MonolithToggle } from '@/components/monolith/MonolithToggle';

export default function Settings() {

    const [gasPriority, setGasPriority] = useState('Fast');
    const [gasLimit, setGasLimit] = useState(45);
    const [priorityFee, setPriorityFee] = useState(2.5);

    return (
        <MonolithLayout>
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="font-display text-3xl text-white mb-2">Settings & Security</h1>
                    <p className="text-silver-dim font-light tracking-wide text-sm">Configure execution parameters and security protocols for autonomous agents.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-white/10 hover:border-white/30 text-xs uppercase tracking-widest text-silver-dim hover:text-white transition-colors">
                        Audit Log
                    </button>
                    <button className="px-4 py-2 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-accent-lime hover:text-black transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">save</span>
                        Save Changes
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {/* Security Protocol Panel */}
                <div className="glass-panel p-6 rounded-sm col-span-1 lg:col-span-2 xl:col-span-1 flex flex-col gap-6">
                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-sm font-display uppercase tracking-widest text-white">Security Protocol</h2>
                            <p className="text-[10px] text-silver-dim mt-1">Global security overrides.</p>
                        </div>
                        <span className="material-symbols-outlined text-silver-dim">lock</span>
                    </div>

                    <div className="space-y-6">
                        <MonolithToggle
                            label="2FA for Withdrawals"
                            description="Require authentication for outgoing assets"
                            defaultChecked
                        />
                        <MonolithToggle
                            label="Auto-Lock Session"
                            description="Lock terminal after 15m inactivity"
                            defaultChecked
                        />
                        <MonolithToggle
                            label="IP Whitelisting"
                            description="Restrict access to known IP addresses"
                        />

                        <div className="p-4 border border-accent-red/30 bg-surface-black/40 mt-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-accent-red-dim pointer-events-none"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <div className="text-sm text-accent-red font-bold uppercase tracking-wide flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">emergency_home</span>
                                        Panic Button
                                    </div>
                                    <div className="text-xs text-silver-dim mt-1">Immediately pause all active agents</div>
                                </div>
                                <label className="switch panic-switch relative inline-block w-9 h-5">
                                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                                    <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#222] transition-[.4s] border border-white/10
                    before:absolute before:content-[''] before:h-3.5 before:w-3.5 before:left-0.5 before:bottom-0.5 before:bg-[#666] before:transition-[.4s]
                    peer-checked:bg-[rgba(255,51,51,0.2)] peer-checked:border-accent-red
                    peer-checked:before:translate-x-4 peer-checked:before:bg-accent-red peer-checked:before:shadow-[0_0_8px_rgba(255,51,51,0.6)]"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gas Configuration Panel */}
                <div className="glass-panel p-6 rounded-sm col-span-1 lg:col-span-2 flex flex-col gap-6">
                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-sm font-display uppercase tracking-widest text-white">Gas Configuration</h2>
                            <p className="text-[10px] text-silver-dim mt-1">Execution cost thresholds.</p>
                        </div>
                        <span className="material-symbols-outlined text-silver-dim">local_gas_station</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1 md:col-span-3">
                            <div className="flex justify-between mb-2">
                                <span className="text-xs uppercase tracking-wide text-silver-dim">Priority Level</span>
                                <span className="text-xs uppercase tracking-wide text-accent-lime">{gasPriority}</span>
                            </div>
                            <div className="flex gap-2 mb-6">
                                {['Standard', 'Fast', 'Ultra'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setGasPriority(level)}
                                        className={`flex-1 py-2 text-xs uppercase tracking-widest transition-colors ${gasPriority === level
                                            ? "border border-accent-lime bg-accent-lime/10 text-accent-lime font-bold shadow-[0_0_15px_rgba(204,255,0,0.1)]"
                                            : "border border-white/10 hover:border-white/30 bg-surface-black text-silver-dim hover:text-white"
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-3 space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between mb-4">
                                    <span className="text-sm text-white">Max Gwei Limit (ETH)</span>
                                    <span className="text-sm font-mono text-accent-lime">{gasLimit} Gwei</span>
                                </div>
                                <div className="relative w-full h-6 flex items-center">
                                    <input
                                        type="range"
                                        min="10"
                                        max="200"
                                        value={gasLimit}
                                        onChange={(e) => setGasLimit(Number(e.target.value))}
                                        className="z-20 relative w-full opacity-0 cursor-pointer h-full"
                                    />
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-surface-zinc pointer-events-none"></div>
                                    <div
                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent-lime pointer-events-none"
                                        style={{ width: `${((gasLimit - 10) / (200 - 10)) * 100}%` }}
                                    ></div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-accent-lime border border-black shadow-[0_0_10px_rgba(204,255,0,0.5)] pointer-events-none"
                                        style={{ left: `calc(${((gasLimit - 10) / (200 - 10)) * 100}% - 3px)` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-silver-dim font-mono">
                                    <span>10</span>
                                    <span>200</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between mb-4">
                                    <span className="text-sm text-white">Priority Fee (Tips)</span>
                                    <span className="text-sm font-mono text-accent-lime">{priorityFee} Gwei</span>
                                </div>
                                <div className="relative w-full h-6 flex items-center">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={priorityFee}
                                        onChange={(e) => setPriorityFee(Number(e.target.value))}
                                        className="z-20 relative w-full opacity-0 cursor-pointer h-full"
                                    />
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-surface-zinc pointer-events-none"></div>
                                    <div
                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent-lime pointer-events-none"
                                        style={{ width: `${(priorityFee / 10) * 100}%` }}
                                    ></div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-accent-lime border border-black shadow-[0_0_10px_rgba(204,255,0,0.5)] pointer-events-none"
                                        style={{ left: `calc(${(priorityFee / 10) * 100}% - 3px)` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-silver-dim font-mono">
                                    <span>0.0</span>
                                    <span>10.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wallet Permissions Panel */}
            <div className="glass-panel border border-white/5 rounded-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-surface-black/40">
                    <div>
                        <h2 className="text-sm font-display uppercase tracking-widest text-white">Wallet Permissions</h2>
                        <p className="text-[10px] text-silver-dim mt-0.5">Manage agent access levels per connected wallet.</p>
                    </div>
                    <button className="text-xs text-accent-lime hover:text-white border border-accent-lime/30 hover:border-accent-lime px-3 py-1 rounded transition-colors uppercase tracking-wide">
                        Add New Wallet
                    </button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-silver-dim border-b border-white/5 bg-surface-black/20">
                            <th className="px-6 py-4 font-normal">Wallet Alias</th>
                            <th className="px-6 py-4 font-normal">Address</th>
                            <th className="px-6 py-4 font-normal text-center">Auto-Execution</th>
                            <th className="px-6 py-4 font-normal text-center">Withdrawal Rights</th>
                            <th className="px-6 py-4 font-normal text-right">Last Active</th>
                            <th className="px-6 py-4 font-normal text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {[
                            { alias: 'Primary Vault', address: '0x8a...42F9', auto: true, withdraw: false, time: '2 min ago' },
                            { alias: 'Trading Alpha', address: '0x4b...91C2', auto: true, withdraw: true, time: '1 hr ago' },
                            { alias: 'Cold Storage Link', address: '0x12...FA77', auto: false, withdraw: false, time: '14 days ago' },
                        ].map((wallet, index) => (
                            <tr key={index} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-surface-zinc border border-white/10 flex items-center justify-center text-silver-dim">
                                            <span className="material-symbols-outlined text-sm">wallet</span>
                                        </div>
                                        <div className="font-medium text-white">{wallet.alias}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-mono text-silver-dim text-xs bg-surface-zinc px-2 py-1 rounded border border-white/5">{wallet.address}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <label className="switch scale-75 relative inline-block w-9 h-5">
                                        <input type="checkbox" defaultChecked={wallet.auto} className="opacity-0 w-0 h-0 peer" />
                                        <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#222] transition-[.4s] border border-white/10
                      before:absolute before:content-[''] before:h-3.5 before:w-3.5 before:left-0.5 before:bottom-0.5 before:bg-[#666] before:transition-[.4s]
                      peer-checked:bg-[rgba(204,255,0,0.2)] peer-checked:border-accent-lime
                      peer-checked:before:translate-x-4 peer-checked:before:bg-accent-lime peer-checked:before:shadow-[0_0_8px_rgba(204,255,0,0.6)]"></span>
                                    </label>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <label className="switch scale-75 relative inline-block w-9 h-5">
                                        <input type="checkbox" defaultChecked={wallet.withdraw} className="opacity-0 w-0 h-0 peer" />
                                        <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#222] transition-[.4s] border border-white/10
                      before:absolute before:content-[''] before:h-3.5 before:w-3.5 before:left-0.5 before:bottom-0.5 before:bg-[#666] before:transition-[.4s]
                      peer-checked:bg-[rgba(204,255,0,0.2)] peer-checked:border-accent-lime
                      peer-checked:before:translate-x-4 peer-checked:before:bg-accent-lime peer-checked:before:shadow-[0_0_8px_rgba(204,255,0,0.6)]"></span>
                                    </label>
                                </td>
                                <td className="px-6 py-4 text-right text-silver-dim text-xs">
                                    {wallet.time}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-silver-dim hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-sm">settings</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MonolithLayout>
    );
}
