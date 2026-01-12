import React from 'react';

export function ResultCard({ label, value, subtext, highlight = false, icon: Icon }) {
    return (
        <div className={`relative overflow-hidden p-5 rounded-xl transition-all duration-300 border ${highlight ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-slate-800/50 border-slate-700'}`}>

            {highlight && (
                <>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                </>
            )}

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <p className={`text-xs font-bold uppercase tracking-widest ${highlight ? 'text-emerald-400' : 'text-slate-400'}`}>{label}</p>
                    {Icon && <Icon className={highlight ? 'text-emerald-400' : 'text-slate-500'} size={18} />}
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-3xl font-mono font-bold tracking-tighter text-white">
                        {value}
                    </p>
                    {subtext && <span className={`text-xs font-mono ${highlight ? 'text-emerald-300/80' : 'text-slate-500'}`}>{subtext}</span>}
                </div>
            </div>

            {/* Decorative Technical Corners */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${highlight ? 'border-emerald-500/50' : 'border-slate-600'} rounded-tl-sm`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${highlight ? 'border-emerald-500/50' : 'border-slate-600'} rounded-br-sm`} />
        </div>
    );
}
