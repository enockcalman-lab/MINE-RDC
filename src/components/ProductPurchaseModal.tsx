import React from 'react';
import { X, ShoppingCart, Calendar, TrendingUp, AlertCircle, ArrowDownToLine, CheckCircle2 } from 'lucide-react';
import { MiningProduct } from '../types';
import { formatFC } from '../utils/formatters';

interface ProductPurchaseModalProps {
  product: MiningProduct | null;
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  onConfirmPurchase: (product: MiningProduct) => void;
  onOpenInvest: (amount: number) => void;
}

export const ProductPurchaseModal: React.FC<ProductPurchaseModalProps> = ({
  product,
  isOpen,
  onClose,
  walletBalance,
  onConfirmPurchase,
  onOpenInvest,
}) => {
  if (!isOpen || !product) return null;

  const hasEnoughBalance = walletBalance >= product.price;
  const netGain = product.totalReturn - product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Activation du Contrat Minier</h3>
              <p className="text-xs text-slate-400">{product.name} ({product.chemicalSymbol})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* Product Image & Info */}
          <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-mono text-amber-400 font-bold">{product.region}</span>
              <h4 className="text-lg font-black text-white">{product.name}</h4>
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Prix d'activation du contrat :</span>
              <span className="text-base font-black text-white tabular-nums">{formatFC(product.price)}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-slate-400">Dividende quotidien crédité :</span>
              <span className="font-bold text-emerald-400 tabular-nums">+{formatFC(product.dailyIncome)} / jour</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-slate-400">Durée du cycle d'exploitation :</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{product.durationDays || 30} Jours consécutifs</span>
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800 bg-slate-900/60 -mx-4 -mb-4 p-4 rounded-b-2xl">
              <div>
                <span className="font-bold text-white block">Rendement Total Garanti :</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Bénéfice net : +{formatFC(netGain)}</span>
              </div>
              <span className="text-lg font-black text-amber-400 tabular-nums">{formatFC(product.totalReturn)}</span>
            </div>
          </div>

          {/* User balance check */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Votre Solde Actuel :</span>
              <span className="text-sm font-black text-white tabular-nums">{formatFC(walletBalance)}</span>
            </div>
            {hasEnoughBalance ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solde Suffisant</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Manque {formatFC(product.price - walletBalance)}</span>
              </span>
            )}
          </div>

          {/* Action button */}
          {hasEnoughBalance ? (
            <button
              onClick={() => {
                onConfirmPurchase(product);
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              Confirmer et Activer le Contrat ({formatFC(product.price)})
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenInvest(product.price - walletBalance);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Recharger Mon Compte pour Acheter ce Produit</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                Dépôt rapide par Mobile Money au numéro <strong>+243 974017803</strong>
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
