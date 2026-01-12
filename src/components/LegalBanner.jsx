import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export function LegalBanner() {
    return (
        <div className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
                <p className="text-slate-400 font-medium text-sm">
                    © 2026 Fil Good — Momper Axel
                </p>
                <p className="text-slate-600 text-xs">
                    Service d'Impression 3D Rapide & Sur Mesure. Les estimations générées sont indicatives.
                </p>
            </div>
        </div>
    );
}
