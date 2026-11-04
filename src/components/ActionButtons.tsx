import React from 'react';
import { Layers, ArrowDownToLine, ArrowUpFromLine, Sparkles, ChevronRight, Phone } from 'lucide-react';
import { OFFICIAL_PHONE_DISPLAY } from '../data/products';

interface ActionButtonsProps {
  onOpenProducts: () => void;
  onOpenInvest: () => void;
  onOpenWithdraw: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onOpenProducts,
  onOpenInvest,
  onOpenWithdraw,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Button 1: Voir les Produits */}
        <button
          onClick={onOpenProducts}
          className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-amber-500/30 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all text-left cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/15 transition-all"></div>
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                Catalogue Minier
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Voir les Produits
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Coltan, Cuivre, Diamant, Or...
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shrink-0 ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Button 2: Investir */}
        <button
          onClick={onOpenInvest}
          className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/15 transition-all text-left cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform shrink-0">
              <ArrowDownToLine className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
                <span>Dépôt Rapide</span>
                <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.2 rounded text-emerald-300">
                  {OFFICIAL_PHONE_DISPLAY}
                </span>
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Investir
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mobile Money instantané
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shrink-0 ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Button 3: Retrait */}
        <button
          onClick={onOpenWithdraw}
          className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-500/30 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/15 transition-all text-left cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform shrink-0">
              <ArrowUpFromLine className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400 block">
                Transfert Mobile
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                Retrait
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sur Airtel, M-Pesa, Orange
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0 ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Prominent Shortcut to Daily Income Collection */}
      <div className="mt-4">
        <a
          href="#recolte-journaliere"
          className="group flex flex-col sm:flex-row items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/80 border-2 border-emerald-500/50 hover:border-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>REVENU QUOTIDIEN SELON PRODUIT ACHETÉ</span>
                <span className="bg-emerald-500/20 px-2 py-0.2 rounded text-[10px] text-emerald-300">
                  Coltan: +3 000 FC · Cuivre: +6 500 FC...
                </span>
              </span>
              <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                👉 Cliquez ici pour accéder au bouton d'encaissement de vos gains journaliers
              </p>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1 shrink-0 group-hover:bg-emerald-400 transition-all shadow-md">
            <span>Encaisser Maintenant</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>
      </div>
    </div>
  );
};
