import React from 'react';
import { Wallet, User, Pickaxe, Sparkles, Clock, Lock } from 'lucide-react';
import { UserAccount } from '../types';
import { formatFC } from '../utils/formatters';
import { OFFICIAL_PHONE_DISPLAY } from '../data/products';

interface HeaderProps {
  walletBalance: number;
  user: UserAccount | null;
  canClaim24h: boolean;
  timeRemaining24h: { hours: number; minutes: number; seconds: number; formatted: string };
  dailyClaimAmount: number;
  onDailyClaim: (e?: React.MouseEvent) => void;
  onOpenWallet: () => void;
  onOpenAccount: () => void;
  onOpenInvest: () => void;
  onOpenWithdraw: () => void;
  onOpenProducts: () => void;
  onOpenInstallApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletBalance,
  user,
  canClaim24h,
  timeRemaining24h,
  dailyClaimAmount,
  onDailyClaim,
  onOpenWallet,
  onOpenAccount,
  onOpenInvest,
  onOpenWithdraw,
  onOpenProducts,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-bold uppercase tracking-wider">MINE RDC Officiel</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-slate-950 font-bold">Bonus 5 000 FC offert à la création du compte</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden md:inline bg-slate-950 text-amber-300 px-2 py-0.5 rounded text-[10px] font-black uppercase">
            Retrait minimum : 1 000 FC (1000f)
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-[11px] font-bold">Assistance : {OFFICIAL_PHONE_DISPLAY}</span>
          <span className="bg-slate-950/20 px-2 py-0.5 rounded text-[11px] font-bold">Paiements 24h/24</span>
        </div>
      </div>

      {/* Main Top Bar: Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Pickaxe className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                MINE <span className="text-amber-400">RDC</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold -mt-1">
                Minéraux du Congo
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button 
            onClick={onOpenProducts}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Nos Produits
          </button>
          <a href="#simulateur" className="hover:text-amber-400 transition-colors whitespace-nowrap">
            Simulateur de Gains
          </a>
          <a href="#epreuves" className="hover:text-amber-400 transition-colors whitespace-nowrap">
            Épreuves & Retraits
          </a>
          <a href="#processus" className="hover:text-amber-400 transition-colors whitespace-nowrap">
            Comment Investir
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors whitespace-nowrap">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Primary Action & Wallet Balance Button with Integrated 24h Daily Claim Mini-Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Wallet Container Button with embedded 24h Daily Credit Mini-Button */}
          <div 
            onClick={onOpenWallet}
            className={`group relative flex items-center gap-1.5 sm:gap-2 pl-2.5 sm:pl-3 pr-1 sm:pr-1.5 py-1.5 rounded-xl border shadow-md transition-all cursor-pointer ${
              user
                ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-emerald-500/40 hover:border-emerald-400/70 shadow-emerald-950/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700/80'
            }`}
            title="Cliquez pour afficher le détail de votre portefeuille"
          >
            {/* Wallet Icon */}
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              user ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
            }`}>
              <Wallet className="w-4 h-4" />
            </div>

            {/* Wallet Balance Display */}
            <div className="flex flex-col items-start leading-tight pr-1">
              <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
                user ? 'text-emerald-400' : 'text-slate-400'
              }`}>
                {user ? 'Portefeuille' : 'Solde 0 FC'}
              </span>
              <span className="text-xs sm:text-sm font-black tabular-nums tracking-wide text-white">
                {user ? formatFC(walletBalance) : '5000f Bonus'}
              </span>
            </div>

            {/* Small button inside the wallet button: 24h Daily Revenue Credit */}
            {canClaim24h ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDailyClaim(e);
                }}
                className="relative flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-black text-[11px] sm:text-xs shadow-md shadow-emerald-500/30 transition-transform active:scale-90 animate-pulse cursor-pointer shrink-0"
                title={`Créditer le revenu minier du jour (+${formatFC(dailyClaimAmount)}) selon vos produits (1 versement / 24h)`}
              >
                <Sparkles className="w-3 h-3 text-slate-950 shrink-0" />
                <span className="hidden xs:inline sm:inline">+{formatFC(dailyClaimAmount)}</span>
                <span className="xs:hidden sm:hidden">+{formatFC(dailyClaimAmount)}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDailyClaim(e);
                }}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-400 text-[10px] sm:text-[11px] font-semibold cursor-pointer shrink-0 transition-colors"
                title={`Revenu du jour déjà versé. Prochain versement dans ${timeRemaining24h.formatted}. Strictement 1 versement toutes les 24h.`}
              >
                <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{timeRemaining24h.formatted}</span>
              </button>
            )}
          </div>

          {/* Account profile / Register button */}
          <button
            onClick={onOpenAccount}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              user
                ? 'bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-slate-800'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-transparent shadow-md shadow-amber-500/20'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">
              {user ? `${user.prenom}` : 'Créer un Compte'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
