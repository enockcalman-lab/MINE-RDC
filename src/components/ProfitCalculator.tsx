import React, { useState } from 'react';
import { MINING_PRODUCTS } from '../data/products';
import { formatFC, formatUSD } from '../utils/formatters';
import { Calculator, ArrowRight, ShieldCheck, Check, Sparkles, TrendingUp } from 'lucide-react';

interface ProfitCalculatorProps {
  onInvestAmount: (amount: number) => void;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ onInvestAmount }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('coltan');
  const selectedProduct = MINING_PRODUCTS.find((p) => p.id === selectedProductId) || MINING_PRODUCTS[0];

  const dailyReturn = selectedProduct.dailyIncome;
  const weeklyReturn = dailyReturn * 7;
  const halfwayReturn = dailyReturn * 15;
  const totalReturn = selectedProduct.totalReturn;
  const netProfit = totalReturn - selectedProduct.price;
  const roi = Math.round((netProfit / selectedProduct.price) * 100);

  return (
    <section id="simulateur" className="py-16 bg-slate-950 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
            Démonstration & Transparence
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 tracking-tight">
            Simulateur de Gains en Direct : Voyez Comment Vos Fonds Travaillent
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Voici la preuve mathématique exacte de vos gains selon les prix réels de nos contrats d'exploitation minière sur 30 jours.
          </p>
        </div>

        {/* Interactive Calculator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Product selector buttons */}
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
              1. Choisissez un pack minier pour simuler vos rendements :
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {MINING_PRODUCTS.slice(0, 5).map((p) => {
                const isSelected = p.id === selectedProductId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider truncate">
                      {p.name.split(' ')[1] || p.name}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white mt-1 tabular-nums">
                      {formatFC(p.price)}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">
                      +{formatFC(p.dailyIncome)}/j
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results grid */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-4">
              2. Décomposition de vos gains réels sur 30 jours :
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Daily Income */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-xs text-slate-400 block">Revenu par Jour</span>
                <span className="text-xl font-extrabold text-emerald-400 tabular-nums mt-1 block">
                  +{formatFC(dailyReturn)}
                </span>
                <span className="text-[11px] text-slate-500">Versé chaque matin à 8h</span>
              </div>

              {/* Weekly Income */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-xs text-slate-400 block">Gains en 7 Jours</span>
                <span className="text-xl font-extrabold text-white tabular-nums mt-1 block">
                  {formatFC(weeklyReturn)}
                </span>
                <span className="text-[11px] text-slate-500">En 1 semaine</span>
              </div>

              {/* Halfway 15 Days */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-xs text-slate-400 block">Gains en 15 Jours</span>
                <span className="text-xl font-extrabold text-white tabular-nums mt-1 block">
                  {formatFC(halfwayReturn)}
                </span>
                <span className="text-[11px] text-slate-500">À mi-parcours (50%)</span>
              </div>

              {/* Total 30 Days */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40">
                <span className="text-xs text-amber-300 font-bold block">Total Final (30 Jours)</span>
                <span className="text-xl font-black text-amber-400 tabular-nums mt-1 block">
                  {formatFC(totalReturn)}
                </span>
                <span className="text-[11px] text-emerald-400 font-bold">
                  Bénéfice : +{formatFC(netProfit)} (+{roi}%)
                </span>
              </div>
            </div>

            {/* Visual comparison bar */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                  <span>Investissement initial : <strong className="text-white">{formatFC(selectedProduct.price)}</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>Bénéfice pur généré : <strong className="text-amber-400">+{formatFC(netProfit)}</strong></span>
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-slate-600 h-full"
                  style={{ width: `${(selectedProduct.price / totalReturn) * 100}%` }}
                  title="Capital initial"
                ></div>
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full"
                  style={{ width: `${(netProfit / totalReturn) * 100}%` }}
                  title="Bénéfice net"
                ></div>
              </div>
              
              <div className="mt-2 text-right text-[11px] text-slate-400">
                Équivalent en USD : ~{formatUSD(totalReturn)} (Taux : 2 800 FC / 1$)
              </div>
            </div>

            {/* CTA action */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tous les retraits sont traités par Mobile Money sous 20 minutes.</span>
              </div>

              <button
                onClick={() => onInvestAmount(selectedProduct.price)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>Investir {formatFC(selectedProduct.price)} Maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
