import React from 'react';
import { UserAccount } from '../types';
import { UserPlus, ShieldCheck, CheckCircle2, Lock, Smartphone, ArrowRight, UserCheck } from 'lucide-react';

interface AccountSectionProps {
  user: UserAccount | null;
  onOpenAccount: () => void;
  onOpenWithdraw: () => void;
}

export const AccountSection: React.FC<AccountSectionProps> = ({
  user,
  onOpenAccount,
  onOpenWithdraw,
}) => {
  return (
    <section id="compte" className="py-16 bg-slate-950 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                Bonus d'Inscription & Sécurité des Retraits
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                Créez Votre Compte et Obtenez Immédiatement Votre Bonus de 5 000 FC (5000f)
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Renseignez votre <strong>Nom, Prénom, Numéro de Téléphone et Mot de Passe</strong> pour recevoir instantanément vos <strong>5 000 FC</strong> offerts. Retraits autorisés vers votre Mobile Money <strong>dès 1 000 FC seulement</strong> !
              </p>

              {/* Requirement badges */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="font-semibold text-slate-200">Nom & Prénom</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="font-semibold text-slate-200">N° Téléphone</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="font-bold text-emerald-400">5 000 FC Offert</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-blue-500/30 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="font-bold text-blue-300">Retrait Dès 1 000 FC</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-end justify-center">
              {user ? (
                <div className="w-full p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-center sm:text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Connecté en tant que :</div>
                      <div className="text-base font-bold text-white">
                        {user.prenom} {user.nom}
                      </div>
                      <div className="text-xs text-emerald-400 font-mono">{user.phone}</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={onOpenWithdraw}
                      className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Effectuer un Retrait</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onOpenAccount}
                      className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                    >
                      Gérer mon profil
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Pas encore de compte ?</h3>
                    <p className="text-xs text-amber-300 mt-1 font-semibold">
                      🎁 5 000 FC (5000f) de bonus offert immédiatement.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Retrait possible dès 1 000 FC (1000f) sur Mobile Money.
                    </p>
                  </div>
                  <button
                    onClick={onOpenAccount}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Créer un Compte & Obtenir Mon Bonus de 5 000 FC</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
