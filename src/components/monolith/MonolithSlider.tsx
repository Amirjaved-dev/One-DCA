import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MonolithSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    valueDisplay?: string;
    minLabel?: string;
    maxLabel?: string;
    priority?: boolean;
}

export const MonolithSlider: React.FC<MonolithSliderProps> = ({
    label,
    valueDisplay,
    minLabel,
    maxLabel,
    className,
    priority = false, // If true, uses accent color for filled part
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState(0);

    const updateProgress = () => {
        if (inputRef.current) {
            const min = parseFloat(inputRef.current.min) || 0;
            const max = parseFloat(inputRef.current.max) || 100;
            const val = parseFloat(inputRef.current.value) || 0;
            const percent = ((val - min) / (max - min)) * 100;
            setProgress(percent);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [props.value, props.defaultValue]);

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex justify-between mb-4">
                <span className="text-sm text-white">{label}</span>
                {valueDisplay && <span className="text-sm font-mono text-accent-lime">{valueDisplay}</span>}
            </div>
            <div className="relative w-full h-6 flex items-center">
                <input
                    ref={inputRef}
                    type="range"
                    className="z-20 relative w-full opacity-0 cursor-pointer"
                    onInput={updateProgress}
                    {...props}
                />
                {/* Custom Track */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-surface-zinc"></div>
                {/* Filled Track */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent-lime"
                    style={{ width: `${progress}%` }}
                ></div>
                {/* Thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-accent-lime border border-black shadow-[0_0_10px_rgba(204,255,0,0.5)] pointer-events-none"
                    style={{ left: `calc(${progress}% - 3px)` }}
                ></div>
            </div>
            {(minLabel || maxLabel) && (
                <div className="flex justify-between mt-2 text-[10px] text-silver-dim font-mono">
                    <span>{minLabel}</span>
                    <span>{maxLabel}</span>
                </div>
            )}
        </div>
    );
};
