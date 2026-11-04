import React, { useState } from 'react';
import { X, Smartphone, Download, CheckCircle2, Share2, PlusSquare, ArrowRight, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'ios'>('pwa');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.href;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleTriggerInstall = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Transformer MINE RDC en Application Mobile</h3>
              <p className="text-xs text-slate-400">Installation directe sur votre téléphone ou création APK</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'pwa'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Installer Directement (PWA Mobile)
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'apk'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Créer un Fichier APK Android
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'ios'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Sur iPhone (iOS)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* TAB 1: Direct PWA Installation */}
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Installation Instantanée sur Votre Écran d'Accueil
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Ce site est déjà doté de la technologie <strong>PWA (Progressive Web App)</strong>. Il peut s'installer sur votre téléphone comme une véritable application native.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {isInstalled ? (
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-2 rounded-xl border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Application MINE RDC déjà installée sur cet appareil !</span>
                    </div>
                  ) : isInstallable ? (
                    <button
                      onClick={handleTriggerInstall}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Installer l'Appli MINE RDC Maintenant</span>
                    </button>
                  ) : (
                    <div className="text-xs text-slate-300">
                      Si le bouton automatique ne s'affiche pas, suivez les étapes manuelles ci-dessous :
                    </div>
                  )}

                  <span className="text-[11px] text-slate-400">
                    Prend moins de 2 Mo · Rapide & Léger
                  </span>
                </div>
              </div>

              {/* Instructions Android Chrome */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Étapes pour Android (Google Chrome)</span>
                </h5>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    Ouvrez ce site dans le navigateur <strong>Google Chrome</strong> de votre smartphone Android.
                  </li>
                  <li>
                    Appuyez sur les <strong>3 petits points verticaux (⋮)</strong> en haut à droite du navigateur.
                  </li>
                  <li>
                    Sélectionnez l'option <strong>« Installer l'application »</strong> ou <strong>« Ajouter à l'écran d'accueil »</strong>.
                  </li>
                  <li>
                    Appuyez sur <strong>« Installer »</strong>. L'icône MINE RDC apparaît instantanément sur l'écran d'accueil de votre téléphone avec le logo officiel !
                  </li>
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Avantage PWA :</span>
                <span className="text-emerald-400 font-semibold">
                  S'ouvre en plein écran sans barre d'adresse de navigateur, comme une application Play Store.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: How to build APK for Android / Play Store */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-1">
                  Méthode 1 : Convertir en APK gratuitement avec PWABuilder (Recommandé)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>PWABuilder</strong> (développé par Microsoft) analyse l'URL de votre site et génère un fichier <strong>.apk</strong> ou <strong>.aab</strong> prêt à être installé sur n'importe quel smartphone Android ou publié sur le Google Play Store.
                </p>

                <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-amber-300 text-[11px]">
                    {appUrl}
                  </div>
                  <button
                    onClick={handleCopyUrl}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copié !' : 'Copier l’URL'}</span>
                  </button>
                </div>

                <ol className="mt-3 text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Copiez l’URL de votre site ci-dessus.</li>
                  <li>Rendez-vous sur <a href="https://www.pwabuilder.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-bold inline-flex items-center gap-1">PWABuilder.com <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Collez l'URL et cliquez sur <strong>« Start »</strong>.</li>
                  <li>Cliquez sur <strong>« Package For Stores » ➔ « Android » ➔ « Generate APK »</strong>.</li>
                  <li>Téléchargez et installez directement le fichier <strong>.apk</strong> sur vos téléphones Android !</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-1">
                  Méthode 2 : Avec Capacitor ou Android Studio WebView
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Si vous êtes développeur ou souhaitez un package personnalisé :
                </p>
                <div className="mt-2 text-xs text-slate-400 bg-slate-900 p-3 rounded-xl font-mono space-y-1">
                  <div>npm install @capacitor/core @capacitor/cli @capacitor/android</div>
                  <div>npx cap init "MINE RDC" "cd.mine.rdc"</div>
                  <div>npx cap add android</div>
                  <div>npx cap open android</div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Cela génère un projet Android Studio complet prêt à compiler un APK signé pour la République Démocratique du Congo.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: iOS iPhone */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Installation sur iPhone / iPad (Safari)</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sur les appareils Apple (iOS), Apple n'autorise pas les téléchargements d'APK, mais vous pouvez installer l'application en 2 secondes via Safari :
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Ouvrez le site dans le navigateur <strong>Safari</strong> de votre iPhone.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">2</span>
                    <span>Appuyez sur le bouton <strong>Partager</strong> <Share2 className="w-3.5 h-3.5 inline text-blue-400 ml-1" /> en bas de l'écran.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">3</span>
                    <span>Faites défiler vers le bas et touchez <strong>« Sur l'écran d'accueil »</strong> <PlusSquare className="w-3.5 h-3.5 inline text-emerald-400 ml-1" />.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">4</span>
                    <span>Touchez <strong>« Ajouter »</strong> en haut à droite. L'icône de l'app MINE RDC s'ajoute à votre écran !</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PWA certifiée compatible Android, iOS & Ordinateur</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
