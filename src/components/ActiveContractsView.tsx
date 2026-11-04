import React from 'react';
import { ActiveContract } from '../types';
import { formatFC } from '../utils/formatters';
import { Pickaxe, Sparkles, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ActiveContractsViewProps {
  contracts: ActiveContract[];
  onCollectEarnings: () => void;
  onOpenProducts: () => void;
}

export const ActiveContractsView: React.FC<ActiveContractsViewProps> = ({
  contracts,
  onCollectEarnings,
  onOpenProducts,
}) => {
  const totalDaily = contracts.reduce((acc, c) => acc + c.dailyIncome, 0);
  const totalUncollected = contracts.reduce((acc, c) => acc + c.uncollectedEarnings, 0);

  if (contracts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Pickaxe className="w-4 h-4" />
              <span>Vos Gisements en Exploitation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Mes Contrats Miniers Actifs ({contracts.length})
            </h2>
          </div>

          {/* Quick Collect Action */}
          {totalUncollected > 0 ? (
            <button
              onClick={onCollectEarnings}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Récolter +{formatFC(totalUncollected)} Maintenant</span>
            </button>
          ) : (
            <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Prochain dividende dans quelques heures</span>
            </div>
          )}
        </div>

        {/* Contracts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((c) => {
            const progress = Math.min(100, Math.round((c.daysElapsed / c.durationDays) * 100));

            return (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400">Contrat Minier Actif</span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      En cours
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{c.productName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Investissement initial : <strong>{formatFC(c.investedAmount)}</strong>
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Revenu quotidien :</span>
                      <span className="font-extrabold text-emerald-400 tabular-nums">
                        +{formatFC(c.dailyIncome)} / jour
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Avancement du cycle :</span>
                      <span className="font-bold text-white">
                        Jour {c.daysElapsed} sur {c.durationDays}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${Math.max(5, progress)}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>Déjà récolté : {formatFC(c.totalCollected)}</span>
                      <span className="text-amber-400 font-bold">
                        Reste : {c.durationDays - c.daysElapsed} jours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Dividende en attente :</span>
                  <span className="font-black text-emerald-400 tabular-nums">
                    +{formatFC(c.uncollectedEarnings)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
