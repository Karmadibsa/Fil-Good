import React from 'react';

export function InputGroup({ label, value, onChange, type = "number", placeholder, icon, unit, step, minimal, lightMode }) {

    if (lightMode) {
        return (
            <div className="flex flex-col">
                {label && (
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        step={step}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-medium rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                    {unit && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span className="text-slate-400 text-sm font-medium bg-slate-50 pl-2">{unit}</span>
                        </div>
                    )}
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Fallback to existing logic (Dark/Minimal) if lightMode is false
    return (
        <div className="space-y-1">
            {label && <label className="text-sm text-zinc-400 font-light ml-1">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full bg-transparent border-b ${minimal ? 'border-zinc-800' : 'border-zinc-700'} py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/50 transition-colors`}
                    placeholder={placeholder}
                    step={step}
                />
                {unit && <span className="absolute right-0 top-2 text-zinc-600 text-xs">{unit}</span>}
            </div>
        </div>
    );
}
