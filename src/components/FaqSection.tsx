import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { OFFICIAL_PHONE_DISPLAY } from '../data/products';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quel est le montant minimum pour commencer à investir ?',
      a: 'Le montant minimum est de 10 000 FC avec le pack minier "Le Coltan". Il génère 3 000 FC par jour pendant 30 jours, soit un total de 90 000 FC (un bénéfice net de 80 000 FC).',
    },
    {
      q: 'Comment obtenir le bonus de 5 000 FC et quel est le retrait minimum ?',
      a: 'Tout nouvel utilisateur qui crée son compte (Nom, Prénom, Téléphone et Mot de passe) reçoit automatiquement un bonus de bienvenue de 5 000 FC (5000f) crédité dans son portefeuille. Le montant minimum pour demander un retrait est de seulement 1 000 FC (1000f).',
    },
    {
      q: 'Quel est le numéro officiel pour effectuer mon transfert d’investissement ?',
      a: `Le numéro officiel unique agréé par MINE RDC est le ${OFFICIAL_PHONE_DISPLAY}. Tout transfert doit être adressé à ce numéro via Airtel Money, Vodacom M-Pesa ou Orange Money. Notre équipe valide immédiatement la transaction.`,
    },
    {
      q: 'Pourquoi la création d’un compte est-elle obligatoire pour le retrait ?',
      a: 'La création de votre compte avec votre Nom, Prénom, Numéro de téléphone et Mot de passe garantit que seuls vous pouvez initier et recevoir des retraits vers votre propre numéro Mobile Money.',
    },
    {
      q: 'Combien de fois puis-je acheter chaque produit minier ?',
      a: 'Chaque compte dispose de quotas définis : Le Coltan (max 5 fois), Le Cuivre (max 4 fois), Le Diamant (max 3 fois), L’Or (max 2 fois), et Le Manganèse (max 2 fois). Cela permet d’assurer une répartition équitable des réserves extraites.',
    },
    {
      q: 'Combien de temps prend un retrait d’argent vers mon Mobile Money ?',
      a: 'Les demandes de retrait sont traitées automatiquement 24h/24 dès 1 000 FC. Les fonds sont reçus sur votre Airtel Money, M-Pesa ou Orange Money en 5 à 20 minutes.',
    },
    {
      q: 'Comment contacter le service client en cas de problème ?',
      a: `Vous pouvez joindre notre assistance 24h/7 directement sur WhatsApp ou par appel téléphonique au ${OFFICIAL_PHONE_DISPLAY}.`,
    },
  ];

  return (
    <section id="faq" className="py-16 bg-slate-950 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
            Foire Aux Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
            Questions Fréquentes des Investisseurs
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Tout ce que vous devez savoir pour investir et retirer en toute confiance.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
