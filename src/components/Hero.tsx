import React from 'react';
import { ShieldCheck, TrendingUp, Zap, Clock, Users } from 'lucide-react';
import { ActionButtons } from './ActionButtons';

interface HeroProps {
  onOpenProducts: () => void;
  onOpenInvest: () => void;
  onOpenWithdraw: () => void;
  onOpenAccount: () => void;
  onOpenInstallApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenProducts,
  onOpenInvest,
  onOpenWithdraw,
  onOpenAccount,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-slate-800">
      {/* Background glow and subtle mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Proposition and Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Trust badge */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-full w-fit">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Secteur Minier RDC · Contrats Sécurisés 30 Jours</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance">
              Participez à l’Exploitation Minière avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">MINE RDC</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Investissez dans nos réserves de <span className="text-amber-300 font-semibold">Coltan</span>, <span className="text-amber-300 font-semibold">Cuivre</span>, <span className="text-amber-300 font-semibold">Diamant</span>, <span className="text-amber-300 font-semibold">Or</span> et <span className="text-amber-300 font-semibold">Manganèse</span>. Commencez dès <span className="text-white font-bold">10 000 FC</span> et recevez des gains quotidiens garantis pendant 30 jours directement sur votre compte Mobile Money.
            </p>

            {/* Key feature pills */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Revenus journaliers crédités à 08h00</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Durée fixe : 30 jours</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Retraits instantanés en RDC</span>
              </div>
            </div>

            {/* The 3 Core Action Buttons immediately under header/hero copy */}
            <div className="mt-8">
              <ActionButtons
                onOpenProducts={onOpenProducts}
                onOpenInvest={onOpenInvest}
                onOpenWithdraw={onOpenWithdraw}
              />
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/mine_rdc_hero_1793795259477.jpg"
                alt="Exploitation minière MINE RDC en République Démocratique du Congo"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                    Gisement RDC Actif
                  </span>
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                    Rendement : Dividendes Quotidiens 30j
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Extraction Katanga & Kivu
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Nos équipements industriels tournent en continu pour assurer la liquidité quotidienne de vos gains.
                </p>

                {/* Live mini ticker inside image card */}
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contrats actifs : 30 jours</span>
                  </div>
                  <div className="text-amber-400 font-bold tabular-nums">
                    Dès 10 000 FC
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live metric indicators row */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Bonus Inscription</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums mt-0.5 block">
              5 000 FC
            </span>
            <span className="text-[11px] text-emerald-400 font-bold">5000f offert dès création</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Retrait Minimum</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums mt-0.5 block">
              1 000 FC
            </span>
            <span className="text-[11px] text-blue-300 font-bold">1000f par Mobile Money</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Délai de Paiement</span>
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums mt-0.5 block">
              5 à 20 min
            </span>
            <span className="text-[11px] text-emerald-400">Instantané 24h/24</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Investisseurs Actifs</span>
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums mt-0.5 block">
              14 820+
            </span>
            <span className="text-[11px] text-slate-400">Partout en RDC</span>
          </div>
        </div>

      </div>
    </section>
  );
};
