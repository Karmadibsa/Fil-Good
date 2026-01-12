import React, { useState } from 'react';
import {
  Package,
  Hammer,
  TrendingUp,
  Box,
  Zap,
  FileDown,
  LayoutGrid,
  Palette,
  Image,
  Menu,
  Github
} from 'lucide-react';
import { InputGroup } from './components/InputGroup';
import { ColorsPage } from './components/ColorsPage';
import { CreationsPage } from './components/CreationsPage';
import { generatePDF } from './utils/pdfGenerator';
import defaultValues from './defaults.json';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [values, setValues] = useState({
    projectName: '',
    filamentPrice: defaultValues.filamentPrice,
    weight: defaultValues.weight,
    printTime: defaultValues.printTime,
    preTime: 10,
    postTime: defaultValues.cleaningTimeMinutes,
    hourlyRate: defaultValues.hourlyRate,
    packagingCost: defaultValues.packagingCost,
    margin: defaultValues.margin,
  });

  const handleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const startHandleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Calculations
  const machineCostRate = defaultValues.machineHourlyCost;
  const materialCost = (values.filamentPrice / 1000) * values.weight;
  const machineCost = values.printTime * machineCostRate;
  const laborCost = ((values.preTime + values.postTime) / 60) * values.hourlyRate;
  const totalCost = materialCost + machineCost + laborCost + values.packagingCost;
  const finalPrice = totalCost * values.margin;
  const profit = finalPrice - totalCost;

  const resultsC = {
    materialCost,
    machineCost,
    laborCost,
    totalCost,
    finalPrice
  };

  // Nav Button Component (Mobile)
  const MobileNavButton = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-20 space-y-1 ${activeTab === tab ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900">

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col items-center py-8 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden lg:flex">
        <div className="px-6 w-full mb-12">
          <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Box size={20} strokeWidth={2.5} />
            </div>
            Fil Good
          </h1>
        </div>

        <nav className="w-full px-4 space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'calculator' ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutGrid size={20} />
            Calculateur
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'colors' ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Palette size={20} />
            Filaments
          </button>
          <button
            onClick={() => setActiveTab('creations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'creations' ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Image size={20} />
            Mes Créations
          </button>
        </nav>

        <div className="px-6 w-full text-center flex flex-col items-center gap-4">
          <a href="https://github.com/Karmadibsa/Fil-Good.git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-50">
            <Github size={20} />
            <span className="text-xs font-medium">GitHub</span>
          </a>
          <p className="text-xs text-slate-400 font-medium">v2.1 • 2026</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative bg-slate-50">

        {/* MOBILE HEADER */}
        <div className="lg:hidden px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-500/20 shadow-lg">
              <Box size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl tracking-tight">Fil Good</span>
          </div>

          <a href="https://github.com/Karmadibsa/Fil-Good.git" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900">
            <Github size={20} />
          </a>
        </div>

        {/* SCROLLABLE VIEW */}
        <div className="flex-1 overflow-y-auto pb-24 lg:pb-0">
          {activeTab === 'colors' ? (
            <div className="p-6 lg:p-12">
              <ColorsPage theme="light" />
            </div>
          ) : activeTab === 'creations' ? (
            <div className="p-6 lg:p-12 h-full">
              <CreationsPage />
            </div>
          ) : (
            <div className="p-6 lg:p-12 max-w-[1600px] mx-auto min-h-full flex flex-col justify-center">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">

                {/* LEFT COLUMN: INPUTS */}
                <div className="xl:col-span-8 flex flex-col gap-8">

                  {/* PROJECT CARD */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Box size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">Projet</h2>
                        <p className="text-slate-500 text-sm">Informations générales</p>
                      </div>
                    </div>
                    <InputGroup
                      label="Nom du projet"
                      value={values.projectName}
                      onChange={(v) => startHandleChange('projectName', v)}
                      type="text"
                      placeholder="Ex: Support Casque..."
                      icon={null}
                      lightMode={true}
                    />
                  </div>

                  {/* METRICS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* MATIERE */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                          <Package size={18} />
                        </div>
                        <h3 className="font-semibold text-slate-800">Matière</h3>
                      </div>
                      <div className="space-y-5 flex-1">
                        <InputGroup label="Prix (€/kg)" value={values.filamentPrice} onChange={(v) => handleChange('filamentPrice', v)} unit="€" lightMode={true} />
                        <InputGroup label="Poids (g)" value={values.weight} onChange={(v) => handleChange('weight', v)} unit="g" lightMode={true} />
                      </div>
                    </div>

                    {/* MACHINE */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                          <Zap size={18} />
                        </div>
                        <h3 className="font-semibold text-slate-800">Machine</h3>
                      </div>
                      <div className="space-y-5 flex-1">
                        <InputGroup label="Temps (h)" value={values.printTime} onChange={(v) => handleChange('printTime', v)} unit="h" lightMode={true} />
                      </div>
                    </div>

                    {/* PRODUCTION */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                          <Hammer size={18} />
                        </div>
                        <h3 className="font-semibold text-slate-800">Production</h3>
                      </div>
                      <div className="space-y-5 flex-1">
                        <InputGroup label="Préparation (min)" value={values.preTime} onChange={(v) => handleChange('preTime', v)} unit="min" lightMode={true} />
                        <InputGroup label="Finition (min)" value={values.postTime} onChange={(v) => handleChange('postTime', v)} unit="min" lightMode={true} />
                      </div>
                    </div>

                    {/* FINANCE */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                          <TrendingUp size={18} />
                        </div>
                        <h3 className="font-semibold text-slate-800">Stratégie</h3>
                      </div>
                      <div className="space-y-5 flex-1">
                        <InputGroup label="Marge (x)" value={values.margin} onChange={(v) => handleChange('margin', v)} unit="x" step="0.1" lightMode={true} />
                        <InputGroup label="Frais Div. (€)" value={values.packagingCost} onChange={(v) => handleChange('packagingCost', v)} unit="€" lightMode={true} />
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: RESULTS */}
                <div className="xl:col-span-4 h-full pb-8 xl:pb-0">
                  <div className="bg-slate-900 text-white rounded-[2rem] p-1 flex flex-col shadow-2xl shadow-slate-900/20 relative overflow-hidden group min-h-[500px] xl:min-h-full xl:sticky xl:top-6">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none mix-blend-screen"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none mix-blend-screen"></div>

                    <div className="relative h-full flex flex-col p-8 md:p-10 z-10">
                      {/* Header */}
                      <div className="mb-10">
                        <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Estimé</p>
                        <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tighter">
                          {Math.floor(finalPrice)}<span className="text-3xl text-slate-400 font-medium tracking-normal">.{finalPrice.toFixed(2).split('.')[1]}€</span>
                        </h2>
                      </div>

                      {/* Breakdown List */}
                      <div className="bg-white/5 rounded-2xl p-6 space-y-1 flex-1 border border-white/10 backdrop-blur-md">
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                          <span className="text-slate-300 text-sm font-medium">Matière</span>
                          <span className="text-white font-mono font-medium">{materialCost.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                          <span className="text-slate-300 text-sm font-medium">Machine</span>
                          <span className="text-white font-mono font-medium">{machineCost.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                          <span className="text-slate-300 text-sm font-medium">Main d'œuvre</span>
                          <span className="text-white font-mono font-medium">{laborCost.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                          <span className="text-slate-300 text-sm font-medium">Frais</span>
                          <span className="text-white font-mono font-medium">{values.packagingCost.toFixed(2)} €</span>
                        </div>

                        <div className="flex justify-between items-center pt-8 mt-2">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Coût de Revient</span>
                          <span className="text-slate-200 font-mono">{totalCost.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between items-center pt-3">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Marge Nette</span>
                          <span className="text-emerald-400 font-mono font-bold">+{profit.toFixed(2)} €</span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="mt-8">
                        <button
                          onClick={() => generatePDF(values, resultsC)}
                          className="w-full h-16 bg-white hover:bg-blue-50 text-slate-900 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-black/10 active:scale-[0.98]"
                        >
                          <FileDown size={20} className="text-blue-600" />
                          <span>Générer Devis PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center px-2 py-2 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <MobileNavButton icon={LayoutGrid} label="Calcul" tab="calculator" />
          <MobileNavButton icon={Palette} label="Filaments" tab="colors" />
          <MobileNavButton icon={Image} label="Créations" tab="creations" />
        </div>

      </main>
    </div>
  );
}

export default App;
