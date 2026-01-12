import React from 'react';
import colorsData from '../colors.json';
import { Droplet } from 'lucide-react';

export function ColorsPage({ theme = 'dark' }) {
    const isLight = theme === 'light';

    // Group colors by type
    const groupedColors = colorsData.reduce((acc, color) => {
        if (!acc[color.type]) {
            acc[color.type] = [];
        }
        acc[color.type].push(color);
        return acc;
    }, {});

    const getBackgroundStyle = (hex) => {
        if (Array.isArray(hex)) {
            return { background: `linear-gradient(135deg, ${hex.join(', ')})` };
        }
        return { backgroundColor: hex };
    };

    // Sort order
    const sortOrder = ['PLA', 'PLA Silk', 'PLA Wood', 'PETG', 'ABS'];
    const sortedGroups = Object.entries(groupedColors).sort(([typeA], [typeB]) => {
        const indexA = sortOrder.indexOf(typeA);
        const indexB = sortOrder.indexOf(typeB);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return typeA.localeCompare(typeB);
    });

    return (
        <div className="max-w-6xl mx-auto h-full">
            <div className="mb-12">
                <h2 className={`text-3xl font-bold mb-2 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Filaments</h2>
                <p className={`font-medium ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Catalogue des matériaux disponibles.</p>
            </div>

            <div className="space-y-16">
                {sortedGroups.map(([type, colors]) => (
                    <div key={type}>
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            <span className={`w-1.5 h-6 rounded-full inline-block ${isLight ? 'bg-blue-600' : 'bg-white/20'}`}></span>
                            {type}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {colors.map((color, index) => (
                                <div key={index} className={`rounded-2xl overflow-hidden transition-all duration-300 group ${isLight
                                    ? 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                                    : 'bg-[#0A0A0A] border border-zinc-900/50 hover:border-zinc-700'
                                    }`}>
                                    {/* Color Preview */}
                                    <div className="h-32 w-full relative" style={getBackgroundStyle(color.hex)}>
                                        <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-black/10' : 'from-black/50'} to-transparent`} />
                                    </div>

                                    {/* Details */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className={`font-medium text-sm leading-tight pr-2 ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>{color.name}</h3>
                                            <div className="w-4 h-4 rounded-full shrink-0 border border-black/10 shadow-sm" style={getBackgroundStyle(color.hex)} />
                                        </div>
                                        <div className={`mt-4 pt-3 flex justify-between items-center ${isLight ? 'border-t border-slate-100' : 'border-t border-zinc-900'}`}>
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-zinc-900/50 text-zinc-600'
                                                }`}>
                                                {color.type}
                                            </span>
                                            {/* Show hex if string, else 'Multicolor' */}
                                            <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-slate-400' : 'text-zinc-600'}`}>
                                                {Array.isArray(color.hex) ? 'Multi' : color.hex}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* PLATES SECTION */}
            <div className="mt-20 mb-12 border-t border-slate-200 pt-16">
                <h2 className={`text-2xl font-bold mb-2 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Surfaces & Finitions</h2>
                <p className={`font-medium mb-8 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Textures disponibles pour la face inférieure de l'objet.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            name: 'Texturé (PEI)',
                            desc: 'Grainé / Mat',
                            style: {
                                backgroundColor: '#d4af37',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23996515' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                            }
                        },
                        {
                            name: 'Carbone',
                            desc: 'Motif Fibre',
                            style: {
                                backgroundColor: '#111827',
                                backgroundImage: 'linear-gradient(45deg, #1f2937 25%, transparent 25%, transparent 75%, #1f2937 75%, #1f2937), linear-gradient(45deg, #1f2937 25%, transparent 25%, transparent 75%, #1f2937 75%, #1f2937)',
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 10px 10px'
                            }
                        },
                        {
                            name: 'Triangles',
                            desc: 'Prismatique',
                            style: {
                                background: 'linear-gradient(115deg, #1e293b, #334155, #1e293b)'
                            }
                        },
                        {
                            name: 'Lisse',
                            desc: 'Miroir / Brillant',
                            style: {
                                background: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #0f172a 100%)'
                            }
                        }
                    ].map((plate, idx) => (
                        <div key={idx} className={`rounded-2xl overflow-hidden group ${isLight
                                ? 'bg-white border border-slate-200 shadow-sm'
                                : 'bg-zinc-900 border border-zinc-800'
                            }`}>
                            <div className="h-24 w-full relative" style={plate.style}>
                                {/* Reflection effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="p-4">
                                <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{plate.name}</h4>
                                <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>{plate.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
