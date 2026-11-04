import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck, CheckCircle2, Phone, Lock, User, LogOut, Check } from 'lucide-react';
import { UserAccount } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onSaveAccount: (account: UserAccount) => void;
  onLogout: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveAccount,
  onLogout,
}) => {
  const [nom, setNom] = useState<string>(user?.nom || '');
  const [prenom, setPrenom] = useState<string>(user?.prenom || '');
  const [phone, setPhone] = useState<string>(user?.phone || '');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [operator, setOperator] = useState<'airtel' | 'mpesa' | 'orange' | 'afrimoney'>('airtel');
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !prenom.trim()) {
      setError('Veuillez renseigner votre nom et votre prénom.');
      return;
    }
    if (!phone.trim()) {
      setError('Veuillez renseigner votre numéro de téléphone.');
      return;
    }
    if (!password) {
      setError('Veuillez créer un mot de passe sécurisé.');
      return;
    }
    if (password.length < 4) {
      setError('Le mot de passe doit comporter au moins 4 caractères.');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    const newAccount: UserAccount = {
      id: user?.id || `user-${Date.now()}`,
      nom: nom.trim(),
      prenom: prenom.trim(),
      phone: phone.trim(),
      password,
      operator,
      createdAt: user?.createdAt || new Date().toISOString(),
    };

    setIsSuccess(true);
    setTimeout(() => {
      onSaveAccount(newAccount);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {user ? 'Mon Compte Investisseur' : 'Créer un Compte de Retrait'}
              </h3>
              <p className="text-xs text-slate-400">
                {user ? 'Informations de sécurité' : 'Obligatoire pour recevoir vos retraits Mobile Money'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {user ? (
            /* Logged in state view */
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
                  {user.prenom.charAt(0)}{user.nom.charAt(0)}
                </div>
                <h4 className="text-lg font-extrabold text-white">
                  {user.prenom} {user.nom}
                </h4>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  Numéro : {user.phone}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compte Validé pour Retraits Mobile Money</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Statut du compte :</span>
                  <span className="font-bold text-emerald-400">Actif · Niveau 1 Certifié</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Opérateur préféré :</span>
                  <span className="font-bold text-white uppercase">{user.operator || 'Airtel Money'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bonus de Bienvenue :</span>
                  <span className="font-bold text-amber-400">5 000 FC (5000f) Obtenu</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Montant Minimum de Retrait :</span>
                  <span className="font-bold text-blue-400">1 000 FC (1000f)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-red-950 hover:border-red-500/40 border border-slate-700 text-slate-300 hover:text-red-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se Déconnecter</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/50 border border-amber-500/40 text-xs text-amber-200 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>🎁 Bonus Inscription : 5 000 FC Offert</span>
                  <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black text-[10px]">
                    Crédit Immédiat
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Créez votre compte maintenant pour recevoir automatiquement vos <strong>5 000 FC (5000f)</strong> dans votre portefeuille.
                </p>
                <div className="pt-1.5 border-t border-slate-800 text-[11px] text-emerald-400 font-bold flex items-center justify-between">
                  <span>⚡ Montant minimum de retrait :</span>
                  <span className="text-white bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Seulement 1 000 FC (1000f)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-slate-400 block mb-1">
                    Nom de Famille :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ex: Mwamba"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-slate-400 block mb-1">
                    Prénom :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ex: Dieudonné"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-slate-400 block mb-1">
                  Numéro de Téléphone Mobile Money (+243...) :
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Ex: +243 97 401 7803 ou 0974017803"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-slate-400 block mb-1">
                  Opérateur Mobile Money de Réception :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'airtel', name: 'Airtel Money' },
                    { id: 'mpesa', name: 'Vodacom M-Pesa' },
                    { id: 'orange', name: 'Orange Money' },
                    { id: 'afrimoney', name: 'Afrimoney' },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setOperator(op.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        operator === op.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {op.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-slate-400 block mb-1">
                    Créer un Mot de Passe :
                  </label>
                  <input
                    type="password"
                    placeholder="Au moins 4 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-slate-400 block mb-1">
                    Confirmer le Mot de Passe :
                  </label>
                  <input
                    type="password"
                    placeholder="Répétez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs">
                  {error}
                </div>
              )}

              {isSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Compte créé avec succès ! Vous pouvez maintenant retirer vos gains.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSuccess}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Créer Mon Compte & Obtenir Mes 5 000 FC (5000f)</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
