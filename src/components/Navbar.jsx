import React, { useState } from 'react';
import clsx from 'clsx';
import { Palette, Calculator, Printer, FileText } from 'lucide-react';

export function Navbar({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'calculator', label: 'Estimations', icon: Calculator },
        { id: 'colors', label: 'Filaments', icon: Palette },
    ];

    return (
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Brand */}
                <div className="flex items-center gap-3">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Printer className="text-white" size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-none">Fil Good</h1>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">3D Printing Cost</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={clsx(
                                    "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-slate-700 text-white shadow-sm"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                )}
                            >
                                <Icon size={16} />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
