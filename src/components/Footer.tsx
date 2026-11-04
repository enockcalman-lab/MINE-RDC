import React from 'react';
import { Pickaxe, Phone, MessageCircle, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { OFFICIAL_INVESTMENT_PHONE, OFFICIAL_PHONE_DISPLAY } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Presentation */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Pickaxe className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white">
                MINE <span className="text-amber-400">RDC</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Première plateforme d'investissement participatif minier en République Démocratique du Congo. Exploitation responsable du Coltan, Cuivre, Diamant, Or et Manganèse.
            </p>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Conforme aux normes du Cadastre Minier RDC</span>
            </div>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Produits Miniers
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#produits" className="hover:text-amber-400 transition-colors">Le Coltan (10 000 FC)</a></li>
              <li><a href="#produits" className="hover:text-amber-400 transition-colors">Le Cuivre (20 000 FC)</a></li>
              <li><a href="#produits" className="hover:text-amber-400 transition-colors">Le Diamant (50 000 FC)</a></li>
              <li><a href="#produits" className="hover:text-amber-400 transition-colors">L’Or Raffiné (100 000 FC)</a></li>
              <li><a href="#produits" className="hover:text-amber-400 transition-colors">Le Manganèse (200 000 FC)</a></li>
            </ul>
          </div>

          {/* Col 3: Assistance & Contact Officiel */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Contact Officiel RDC
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Ligne Directe / Dépôts :</span>
                  <strong className="text-white font-mono text-sm">{OFFICIAL_PHONE_DISPLAY}</strong>
                </div>
              </div>

              <a
                href="https://wa.me/243974017803?text=Bonjour%20MINE%20RDC%2C%20je%20souhaite%20des%20renseignements."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors font-bold text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Assistance WhatsApp 24h/7</span>
              </a>

              <div className="text-[11px] text-slate-400 flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Kinshasa (Gombe) & Kolwezi (Lualaba), RDC</span>
              </div>
            </div>
          </div>

          {/* Col 4: Paiements Mobile Money */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Moyens de Paiement Agréés
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Transferts et retraits sécurisés instantanés vers les 4 réseaux congolais :
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <span className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-slate-200">
                Airtel Money
              </span>
              <span className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-slate-200">
                Vodacom M-Pesa
              </span>
              <span className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-slate-200">
                Orange Money
              </span>
              <span className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-slate-200">
                Afrimoney
              </span>
            </div>
          </div>

        </div>

        {/* Legal notice & bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} MINE RDC. Tous droits réservés. République Démocratique du Congo.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Sécurité SSL 256-Bit</span>
            <span>·</span>
            <span className="text-slate-400">Contrats 30 Jours Fermes</span>
            <span>·</span>
            <span className="text-slate-400">Numéro Agréé : {OFFICIAL_INVESTMENT_PHONE}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
