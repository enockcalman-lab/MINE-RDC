import React from 'react';
import { X, Wallet, ArrowDownToLine, ArrowUpFromLine, Sparkles, CheckCircle2, History, Clock, Lock } from 'lucide-react';
import { formatFC } from '../utils/formatters';
import { Transaction, UserAccount } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  user: UserAccount | null;
  uncollectedEarnings: number;
  transactions: Transaction[];
  canClaim24h?: boolean;
  timeRemaining24h?: { hours: number; minutes: number; seconds: number; formatted: string; formattedWithSec: string };
  dailyClaimAmount?: number;
  onDailyClaim?: () => void;
  onOpenInvest: () => void;
  onOpenWithdraw: () => void;
  onOpenAccount: () => void;
  onCollectEarnings: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  user,
  uncollectedEarnings,
  transactions,
  canClaim24h = true,
  timeRemaining24h = { hours: 0, minutes: 0, seconds: 0, formatted: '00h 00m', formattedWithSec: '00h 00m 00s' },
  dailyClaimAmount = 3000,
  onDailyClaim,
  onOpenInvest,
  onOpenWithdraw,
  onOpenAccount,
  onCollectEarnings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Mon Portefeuille MINE RDC</h3>
              <p className="text-xs text-slate-400">
                {user ? `Compte de ${user.prenom} ${user.nom}` : 'Bonus de 5 000 FC après inscription'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Main Balance Card: Shows 5000f bonus only AFTER inscription! */}
          {user ? (
            /* User is registered: 5000f bonus is actively credited in wallet */
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block">
                Votre Solde Actuel dans le Portefeuille
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums my-2 tracking-tight">
                {formatFC(walletBalance)}
              </div>
              <p className="text-xs text-emerald-300 font-semibold max-w-sm mx-auto">
                ✓ 5 000 FC (5000f) de bonus crédité après votre inscription !
              </p>

              {/* Sub balances */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-left">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Bonus d'Inscription</span>
                  <span className="text-sm font-extrabold text-amber-400 tabular-nums">5 000 FC</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Actif dans le portefeuille</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Retrait Minimum</span>
                  <span className="text-sm font-extrabold text-blue-400 tabular-nums">1 000 FC (1000f)</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Mobile Money direct</span>
                </div>
              </div>

              {/* 24-HOUR DAILY REVENUE CARD */}
              <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Revenu du Jour selon vos Produits</span>
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    1x toutes les 24h
                  </span>
                </div>

                {canClaim24h ? (
                  <div>
                    <p className="text-xs text-slate-300 mb-3">
                      Votre dividende journalier de <strong className="text-emerald-400 font-black">+{formatFC(dailyClaimAmount)}</strong> est disponible pour versement dans votre portefeuille.
                    </p>
                    <button
                      type="button"
                      onClick={onDailyClaim}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Créditer mon Revenu du Jour (+{formatFC(dailyClaimAmount)})</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Revenu du jour déjà versé (+{formatFC(dailyClaimAmount)})</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Prochain versement disponible dans :</span>
                      </span>
                      <strong className="text-amber-300 font-black font-mono">
                        {timeRemaining24h.formattedWithSec}
                      </strong>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      ⚠️ Règle stricte : 1 seul versement toutes les 24 heures pour garantir l'équité des dividendes miniers.
                    </p>
                  </div>
                )}
              </div>

              {/* Minimum withdrawal alert banner */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between">
                <span>Retrait Mobile Money :</span>
                <strong className="text-white font-extrabold">Autorisé dès 1 000 FC</strong>
              </div>
            </div>
          ) : (
            /* User is NOT registered yet: displays that 5000f bonus requires inscription */
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">
                Votre Solde Actuel
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-400 tabular-nums my-2 tracking-tight">
                0 FC
              </div>

              <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 my-3 text-xs leading-relaxed">
                <span className="text-sm font-black text-amber-300 block mb-1">
                  🎁 Bonus de 5 000 FC (5000f) offert après l'inscription !
                </span>
                Le portefeuille affiche seulement <strong>5 000 FC de bonus</strong> une fois votre compte créé (Nom, Prénom, Téléphone et Mot de passe).
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenAccount();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
              >
                Créer Mon Compte pour Afficher Mes 5 000 FC de Bonus
              </button>

              <div className="mt-3 text-[11px] text-blue-300">
                ⚡ Retrait minimum possible : dès <strong>1 000 FC (1000f)</strong>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenInvest();
              }}
              className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Investir / Dépôt</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenWithdraw();
              }}
              className="p-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ArrowUpFromLine className="w-4 h-4" />
              <span>Retrait (Dès 1 000 FC)</span>
            </button>
          </div>

          {/* Transaction History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Historique Récent</span>
              </h4>
              <span className="text-[11px] text-slate-500">Dernières opérations</span>
            </div>

            <div className="space-y-2">
              {transactions.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  Aucune transaction récente enregistrée.
                </div>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          tx.type === 'deposit' || tx.type === 'bonus' || tx.type === 'mining_gain'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {tx.type === 'withdrawal' ? (
                          <ArrowUpFromLine className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownToLine className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white">{tx.description}</div>
                        <div className="text-[10px] text-slate-400">
                          {tx.timestamp} · Réf: {tx.reference}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-black tabular-nums ${
                          tx.type === 'withdrawal' ? 'text-red-400' : 'text-emerald-400'
                        }`}
                      >
                        {tx.type === 'withdrawal' ? '-' : '+'}
                        {formatFC(tx.amount)}
                      </div>
                      <span className="text-[10px] text-emerald-500 font-medium">Validé</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Fermer le Portefeuille
          </button>
        </div>

      </div>
    </div>
  );
};
