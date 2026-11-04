import React from 'react';
import { MiningProduct } from '../types';
import { MINING_PRODUCTS } from '../data/products';
import { formatFC } from '../utils/formatters';
import { Sparkles, Calendar, TrendingUp, CheckCircle2, ShoppingCart, ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  onSelectProduct: (product: MiningProduct) => void;
  onOpenInvest: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProduct,
  onOpenInvest,
}) => {
  return (
    <section id="produits" className="py-16 bg-slate-900/50 border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
            Contrats d'Exploitation Participative
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 tracking-tight">
            Nos Produits Miniers & Rendements 30 Jours
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Choisissez votre minerai, activez votre contrat minier et touchez des dividendes quotidiens pendant 30 jours. Retraits 100% garantis sur Mobile Money en RDC.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MINING_PRODUCTS.map((product) => {
            const netGain = product.totalReturn - product.price;
            const roiPercentage = Math.round((netGain / product.price) * 100);

            return (
              <div
                key={product.id}
                className={`relative rounded-3xl overflow-hidden bg-slate-950 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between ${
                  product.highlight
                    ? 'border-amber-400/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/40'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popularity Badge if highlighted */}
                {product.highlight && (
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Le Plus Populaire
                  </div>
                )}

                {/* Top Image & Visual Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                  
                  {/* Symbol & Region Floating */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono bg-slate-900/90 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      {product.chemicalSymbol}
                    </span>
                    <span className="text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded text-[11px]">
                      {product.region}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Pricing breakdown block */}
                    <div className="mt-5 space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      
                      {/* Prix d'Achat */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Prix d'Achat :</span>
                        <span className="text-lg font-black text-white tabular-nums tracking-wide">
                          {formatFC(product.price)}
                        </span>
                      </div>

                      {/* Revenu par Jour */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <span className="text-xs text-slate-400 font-medium">Revenu par Jour :</span>
                        <span className="text-sm font-extrabold text-emerald-400 tabular-nums">
                          +{formatFC(product.dailyIncome)} / jour
                        </span>
                      </div>

                      {/* Durée du contrat */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <span className="text-xs text-slate-400 font-medium">Durée du Contrat :</span>
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{product.durationDays} Jours fermes</span>
                        </span>
                      </div>

                      {/* Total après 60 Jours */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 bg-slate-950/60 -mx-4 -mb-4 p-4 rounded-b-2xl">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                            Total après 30 Jours :
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            Bénéfice net : +{formatFC(netGain)} ({roiPercentage}%)
                          </span>
                        </div>
                        <span className="text-lg font-black text-amber-400 tabular-nums">
                          {formatFC(product.totalReturn)}
                        </span>
                      </div>
                    </div>

                    {/* Délai et Limite d'achat (Combien de fois on peut acheter) */}
                    <div className="mt-4 flex items-center justify-between text-xs bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                      <span className="text-slate-400">Limite d'achat autorisée :</span>
                      <span className="font-bold text-slate-200">
                        Max {product.maxPurchaseCount} fois / compte
                      </span>
                    </div>
                  </div>

                  {/* Buy / Invest CTA Button */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/20 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Acheter à {formatFC(product.price)}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global info footer note */}
        <div className="mt-12 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Besoin d'un montant personnalisé ou d'une assistance directe ?
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Contactez notre agent agréé officiel MINE RDC sur WhatsApp ou par appel direct.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenInvest}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-amber-500/40 transition-colors whitespace-nowrap"
          >
            Faire un Dépôt pour Acheter
          </button>
        </div>

      </div>
    </section>
  );
};
