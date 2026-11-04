import React from 'react';
import { Layers, Smartphone, TrendingUp, ArrowUpFromLine, CheckCircle2, Phone } from 'lucide-react';
import { OFFICIAL_PHONE_DISPLAY } from '../data/products';

interface HowItWorksSectionProps {
  onOpenInvest: () => void;
  onOpenProducts: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenInvest,
  onOpenProducts,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Sélectionnez Votre Minerai',
      desc: 'Choisissez un contrat adapté à votre budget : Coltan (10 000 FC), Cuivre (20 000 FC), Diamant (50 000 FC), Or (100 000 FC) ou Manganèse (200 000 FC).',
      icon: Layers,
      color: 'text-amber-400',
    },
    {
      num: '02',
      title: 'Transférez via Mobile Money',
      desc: `Envoyez le montant souhaité via Airtel Money, Vodacom M-Pesa ou Orange Money au numéro officiel agréé : ${OFFICIAL_PHONE_DISPLAY}.`,
      icon: Phone,
      color: 'text-emerald-400',
    },
    {
      num: '03',
      title: 'Touchez Vos Gains Quotidiens',
      desc: 'Chaque jour ouvré à 08h00, vos dividendes sont automatiquement calculés et crédités sur votre portefeuille pendant 30 jours entiers.',
      icon: TrendingUp,
      color: 'text-blue-400',
    },
    {
      num: '04',
      title: 'Retirez Directement Vos Fonds',
      desc: 'Créez votre compte de retrait (Nom, Prénom, Téléphone, Mot de passe) et demandez votre virement. Les fonds arrivent en 5 à 20 minutes.',
      icon: ArrowUpFromLine,
      color: 'text-yellow-400',
    },
  ];

  return (
    <section id="processus" className="py-16 bg-slate-900/40 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
            Guide Pas à Pas
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 tracking-tight">
            Comment Fonctionne l'Investissement sur MINE RDC ?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Un processus 100% digital, simple et sécurisé pour tous les citoyens de la République Démocratique du Congo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-950 border border-slate-800 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-600">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Garanti par contrat 30 jours</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
