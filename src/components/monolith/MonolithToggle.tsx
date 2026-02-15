import React from 'react';
import { cn } from '@/lib/utils';

interface MonolithToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    isPanic?: boolean;
}

export const MonolithToggle: React.FC<MonolithToggleProps> = ({
    className,
    label,
    description,
    isPanic = false,
    ...props
}) => {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            {(label || description) && (
                <div>
                    {label && <div className={cn("text-sm", isPanic ? "text-accent-red font-bold uppercase tracking-wide flex items-center gap-2" : "text-white")}>
                        {isPanic && <span className="material-symbols-outlined text-base">emergency_home</span>}
                        {label}
                    </div>}
                    {description && <div className="text-xs text-silver-dim">{description}</div>}
                </div>
            )}
            <label className={cn("switch relative inline-block w-9 h-5", isPanic && "panic-switch")}>
                <input type="checkbox" className="opacity-0 w-0 h-0 peer" {...props} />
                <span className={cn(
                    "slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#222] transition-[.4s] border border-white/10",
                    "before:absolute before:content-[''] before:h-3.5 before:w-3.5 before:left-0.5 before:bottom-0.5 before:bg-[#666] before:transition-[.4s]",
                    "peer-checked:bg-[rgba(204,255,0,0.2)] peer-checked:border-accent-lime",
                    "peer-checked:before:translate-x-4 peer-checked:before:bg-accent-lime peer-checked:before:shadow-[0_0_8px_rgba(204,255,0,0.6)]",
                    isPanic && "peer-checked:bg-[rgba(255,51,51,0.2)] peer-checked:border-accent-red peer-checked:before:bg-accent-red peer-checked:before:shadow-[0_0_8px_rgba(255,51,51,0.6)]"
                )}></span>
            </label>
        </div>
    );
};
