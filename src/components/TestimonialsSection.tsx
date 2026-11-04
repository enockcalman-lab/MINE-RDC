import React from 'react';
import { TESTIMONIAL_PROOFS, LIVE_RECENT_WITHDRAWALS } from '../data/testimonials';
import { formatFC } from '../utils/formatters';
import { CheckCircle2, ShieldCheck, ArrowUpRight, MessageSquareQuote, Smartphone, Clock, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="epreuves" className="py-16 bg-slate-900/60 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
            Témoignages & Preuves de Retrait Réussis
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 tracking-tight">
            Épreuves Réelles des Membres MINE RDC Ayant Reçu Leurs Gains
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Découvrez les preuves de transferts Mobile Money des investisseurs partout en République Démocratique du Congo : Kinshasa, Lubumbashi, Kolwezi, Goma et Mbuji-Mayi.
          </p>
        </div>

        {/* Live Withdrawal Activity Ticker */}
        <div className="mb-10 p-3 sm:p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 overflow-hidden">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Flux des Derniers Retraits Effectués en RDC</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            {LIVE_RECENT_WITHDRAWALS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
              >
                <span className="font-bold text-white">{item.name}</span>
                <span className="text-slate-500">({item.city})</span>
                <span className="text-emerald-400 font-extrabold tabular-nums">
                  +{formatFC(item.amount)}
                </span>
                <span className="text-[11px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {item.operator}
                </span>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIAL_PROOFS.map((proof) => {
            return (
              <div
                key={proof.id}
                className="rounded-3xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all p-5 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Operator tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold text-xs">
                      {proof.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {proof.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {proof.city} · {proof.phoneMasked}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
                    {proof.operator}
                  </span>
                </div>

                {/* Investment to Payout Receipt Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 my-2 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pack minier choisi :</span>
                    <span className="font-bold text-amber-300">{proof.productInvested}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Montant investi :</span>
                    <span className="font-bold text-white tabular-nums">{formatFC(proof.amountInvested)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
                    <span className="text-emerald-400 font-bold">Somme retirée & reçue :</span>
                    <span className="text-base font-black text-emerald-400 tabular-nums">
                      +{formatFC(proof.amountReceived)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Réf SMS : <strong className="font-mono text-slate-400">{proof.transactionRef}</strong></span>
                    <span>{proof.date}</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="mt-3 text-xs text-slate-300 leading-relaxed italic bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                  "{proof.comment}"
                </div>

                {/* Verified footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Transaction Mobile Money Validée</span>
                  </span>
                  <span>MINE RDC Agréé</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
