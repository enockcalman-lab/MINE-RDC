import React, { useState } from 'react';
import { X, Copy, Check, Phone, ArrowDownToLine, MessageCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { OFFICIAL_INVESTMENT_PHONE, OFFICIAL_PHONE_DISPLAY, MINING_PRODUCTS } from '../data/products';
import { formatFC } from '../utils/formatters';

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDeposit: (amount: number, reference: string, operator: string) => void;
  initialAmount?: number;
}

export const InvestModal: React.FC<InvestModalProps> = ({
  isOpen,
  onClose,
  onConfirmDeposit,
  initialAmount = 10000,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [operator, setOperator] = useState<string>('airtel');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [smsReference, setSmsReference] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+243974017803');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 10000) {
      setError('Le montant minimum pour investir est de 10 000 FC.');
      return;
    }
    if (!senderPhone.trim()) {
      setError('Veuillez renseigner votre numéro de téléphone utilisé pour le transfert.');
      return;
    }

    const ref = smsReference.trim() || `TX-${Math.floor(100000 + Math.random() * 900000)}`;
    setIsSuccess(true);

    setTimeout(() => {
      onConfirmDeposit(amount, ref, operator);
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const presetAmounts = [10000, 20000, 50000, 100000, 200000, 500000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ArrowDownToLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Investir & Recharger mon Compte</h3>
              <p className="text-xs text-slate-400">Dépôt sécurisé par Mobile Money en RDC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Step 1: Official Phone Number Callout Banner (Prompt requirement: "+243 974017803") */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 to-slate-950 border border-emerald-500/50 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Numéro Officiel de Dépôt / Investissement MINE RDC
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Agent Agréé
              </span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-wider tabular-nums">
                    {OFFICIAL_PHONE_DISPLAY}
                  </div>
                  <div className="text-xs text-slate-400">
                    Bénéficiaire : <strong>MINE RDC / Caisse Centrale</strong>
                  </div>
                </div>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopyPhone}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copié avec succès !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier le Numéro</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp link */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <span>Besoin d'aide pour le paiement ?</span>
              <a
                href="https://wa.me/243974017803?text=Bonjour%20MINE%20RDC%2C%20je%20souhaite%20investir%20dans%20la%20plateforme."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ouvrir sur WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Choose Amount */}
            <div>
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-2">
                1. Choisissez le Montant à Investir (en Francs Congolais) :
              </label>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {presetAmounts.map((pAmount) => (
                  <button
                    key={pAmount}
                    type="button"
                    onClick={() => {
                      setAmount(pAmount);
                      setError('');
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border tabular-nums ${
                      amount === pAmount
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {formatFC(pAmount)}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="10000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Ou saisissez un montant personnalisé"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold tabular-nums focus:outline-none focus:border-amber-400"
                  required
                />
                <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-bold">FC</span>
              </div>
            </div>

            {/* Choose Operator */}
            <div>
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-2">
                2. Votre Opérateur Mobile Money :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'airtel', name: 'Airtel Money', ussd: '*501#' },
                  { id: 'mpesa', name: 'M-Pesa (Vodacom)', ussd: '*1222#' },
                  { id: 'orange', name: 'Orange Money', ussd: '*144#' },
                  { id: 'afrimoney', name: 'Afrimoney', ussd: '*111#' },
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setOperator(op.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      operator === op.id
                        ? 'bg-slate-800 border-amber-400 text-white font-bold ring-1 ring-amber-400/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{op.name}</div>
                    <div className="text-[10px] text-amber-400 mt-0.5">{op.ussd}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sender Phone & SMS Ref */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase font-bold text-slate-400 block mb-1.5">
                  3. Votre Numéro Expéditeur (+243...) :
                </label>
                <input
                  type="tel"
                  placeholder="Ex: 0974017803 ou +243..."
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-slate-400 block mb-1.5">
                  4. Réf / ID de Transaction SMS :
                </label>
                <input
                  type="text"
                  placeholder="Ex: MP938210 ou AT18492"
                  value={smsReference}
                  onChange={(e) => setSmsReference(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
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
                <span>Dépôt vérifié avec succès ! Crédit en cours sur votre portefeuille...</span>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/40 transition-all active:scale-[0.98] cursor-pointer"
            >
              Confirmer Mon Dépôt de {formatFC(amount)}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
