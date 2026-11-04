import React, { useState } from 'react';
import { X, ArrowUpFromLine, ShieldCheck, AlertCircle, UserPlus, CheckCircle2, Lock } from 'lucide-react';
import { formatFC } from '../utils/formatters';
import { UserAccount } from '../types';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  user: UserAccount | null;
  onOpenAccount: () => void;
  onConfirmWithdrawal: (amount: number, phone: string, operator: string) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  user,
  onOpenAccount,
  onConfirmWithdrawal,
}) => {
  const [amount, setAmount] = useState<number>(walletBalance >= 1000 ? (walletBalance >= 5000 ? 5000 : walletBalance) : 1000);
  const [operator, setOperator] = useState<string>('airtel');
  const [phone, setPhone] = useState<string>(user?.phone || '');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Case 1: User does not have an account yet
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
        <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white">Compte Requis pour le Retrait</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Conformément à la sécurité financière MINE RDC, vous devez créer votre compte avec votre <strong>Nom, Prénom, Numéro de Téléphone et Mot de Passe</strong> afin d'autoriser l'envoi de vos fonds vers votre Mobile Money.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenAccount();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Créer Mon Compte de Retrait Maintenant</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: User has an account, show withdrawal form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError('Veuillez renseigner un montant valide.');
      return;
    }
    if (amount > walletBalance) {
      setError(`Solde insuffisant. Votre solde disponible est de ${formatFC(walletBalance)}.`);
      return;
    }
    if (amount < 1000) {
      setError('Le montant minimum de retrait est de 1 000 FC (1000f).');
      return;
    }
    if (!phone.trim()) {
      setError('Veuillez renseigner votre numéro Mobile Money de réception.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmWithdrawal(amount, phone, operator);
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ArrowUpFromLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Demande de Retrait Mobile Money</h3>
              <p className="text-xs text-slate-400">Compte : {user.prenom} {user.nom}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Balance card */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Solde Retirable Disponible :</span>
              <div className="text-2xl font-black text-emerald-400 tabular-nums">
                {formatFC(walletBalance)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAmount(walletBalance)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-400 font-bold border border-slate-700"
            >
              Tout Retirer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Montant à retirer :
                </label>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Minimum : 1 000 FC (1000f)
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1000"
                  max={walletBalance}
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold tabular-nums focus:outline-none focus:border-blue-400"
                  required
                />
                <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-bold">FC</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Vous pouvez retirer dès que vous avez au moins 1 000 FC dans votre portefeuille.
              </p>
            </div>

            {/* Operator select */}
            <div>
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-1.5">
                Opérateur de Réception :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'airtel', name: 'Airtel Money' },
                  { id: 'mpesa', name: 'M-Pesa Vodacom' },
                  { id: 'orange', name: 'Orange Money' },
                  { id: 'afrimoney', name: 'Afrimoney' },
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setOperator(op.id)}
                    className={`py-2 px-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      operator === op.id
                        ? 'bg-blue-600/20 border-blue-400 text-blue-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {op.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient phone */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-400 block mb-1.5">
                Numéro Mobile Money de Réception :
              </label>
              <input
                type="tel"
                placeholder="Ex: 0974017803 ou 081..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            {/* Security password check */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-400 block mb-1.5">
                Mot de Passe de Votre Compte MINE RDC :
              </label>
              <input
                type="password"
                placeholder="Votre mot de passe pour sécuriser la transaction"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 font-bold animate-pulse">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Demande de retrait envoyée ! Traitement par l'opérateur en cours...</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-950/40 transition-all active:scale-[0.98] cursor-pointer"
            >
              Valider le Retrait de {formatFC(amount)}
            </button>
          </form>

          <p className="text-[11px] text-slate-500 text-center">
            Les fonds sont transférés vers votre portefeuille mobile dans un délai moyen de 5 à 20 minutes. Aucun frais caché.
          </p>

        </div>

      </div>
    </div>
  );
};
