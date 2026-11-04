/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { ProfitCalculator } from './components/ProfitCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AccountSection } from './components/AccountSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WalletModal } from './components/WalletModal';
import { InvestModal } from './components/InvestModal';
import { WithdrawModal } from './components/WithdrawModal';
import { AccountModal } from './components/AccountModal';
import { ProductPurchaseModal } from './components/ProductPurchaseModal';
import { InstallAppModal } from './components/InstallAppModal';
import { MiningProduct, UserAccount, ActiveContract, Transaction } from './types';
import { MINING_PRODUCTS, OFFICIAL_INVESTMENT_PHONE } from './data/products';
import { formatFC } from './utils/formatters';
import { Check, Info, AlertCircle, Sparkles, Clock } from 'lucide-react';

export default function App() {
  // User Account from localStorage
  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('mine_rdc_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Wallet balance: displays 5 000 FC bonus ONLY AFTER inscription (registration)!
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const savedUser = localStorage.getItem('mine_rdc_user');
    if (!savedUser) {
      return 0; // No account registered: strictly 0 FC until inscription
    }
    const saved = localStorage.getItem('mine_rdc_wallet');
    return saved !== null ? JSON.parse(saved) : 5000;
  });

  // Active Mining Contracts
  const [contracts, setContracts] = useState<ActiveContract[]>(() => {
    const saved = localStorage.getItem('mine_rdc_contracts');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Transaction history
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('mine_rdc_tx');
    if (saved) return JSON.parse(saved);
    const savedUser = localStorage.getItem('mine_rdc_user');
    if (savedUser) {
      return [
        {
          id: 'tx-bonus-1',
          type: 'bonus',
          amount: 5000,
          timestamp: 'À l’inscription',
          status: 'success',
          reference: 'BONUS-5000FC-INSCRIPTION',
          description: 'Bonus de Bienvenue Création de Compte',
        },
      ];
    }
    return [];
  });

  // Modals state
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [investInitialAmount, setInvestInitialAmount] = useState<number>(10000);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MiningProduct | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mine_rdc_wallet', JSON.stringify(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('mine_rdc_contracts', JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem('mine_rdc_tx', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mine_rdc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mine_rdc_user');
    }
  }, [user]);

  // Handler: Confirm Deposit
  const handleConfirmDeposit = (amount: number, reference: string, operator: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      amount,
      timestamp: 'À l’instant',
      status: 'success',
      reference,
      description: `Dépôt Mobile Money (${operator.toUpperCase()})`,
      operator,
    };

    setWalletBalance((prev) => prev + amount);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Dépôt de ${formatFC(amount)} crédité sur votre portefeuille !`);
  };

  // Handler: Confirm Withdrawal
  const handleConfirmWithdrawal = (amount: number, phone: string, operator: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'withdrawal',
      amount,
      timestamp: 'À l’instant',
      status: 'pending',
      reference: `RET-${Math.floor(100000 + Math.random() * 900000)}`,
      description: `Retrait vers ${phone} (${operator.toUpperCase()})`,
      operator,
    };

    setWalletBalance((prev) => Math.max(0, prev - amount));
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Demande de retrait de ${formatFC(amount)} transmise ! Paiement sous 15 min.`);
  };

  // Handler: Confirm Product Purchase
  const handleConfirmPurchase = (product: MiningProduct) => {
    if (walletBalance < product.price) {
      showToast(`Solde insuffisant pour acheter ${product.name}`);
      return;
    }

    setWalletBalance((prev) => prev - product.price);

    const newContract: ActiveContract = {
      id: `c-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      investedAmount: product.price,
      dailyIncome: product.dailyIncome,
      startDate: new Date().toISOString().split('T')[0],
      durationDays: product.durationDays,
      daysElapsed: 1,
      totalCollected: 0,
      uncollectedEarnings: product.dailyIncome,
      status: 'active',
    };

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      amount: product.price,
      timestamp: 'À l’instant',
      status: 'success',
      reference: `ACT-${product.chemicalSymbol}-${Date.now().toString().slice(-4)}`,
      description: `Activation Contrat Minier ${product.name}`,
    };

    setContracts((prev) => [newContract, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Félicitations ! Contrat ${product.name} activé pour ${product.durationDays || 30} jours.`);
  };

  // 24-HOUR COOLDOWN TIMER LOGIC (Strictly prevents claiming twice or multiple times per day)
  const CLAIM_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number | null>(() => {
    const saved = localStorage.getItem('mine_rdc_last_claim_ts');
    return saved ? parseInt(saved, 10) : null;
  });

  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Live timer tick every second for real-time 24h countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const msElapsed = lastClaimTimestamp ? currentTime - lastClaimTimestamp : Infinity;
  const canClaim24h = msElapsed >= CLAIM_COOLDOWN_MS;
  const msRemaining = canClaim24h ? 0 : CLAIM_COOLDOWN_MS - msElapsed;

  const remainingHours = Math.floor(msRemaining / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((msRemaining % (1000 * 60)) / 1000);

  const timeRemaining24h = {
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
    formatted: `${remainingHours}h ${remainingMinutes.toString().padStart(2, '0')}m`,
    formattedWithSec: `${remainingHours}h ${remainingMinutes.toString().padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`,
  };

  // Daily revenue claim amount dynamically calculated according to purchased/active mining products
  const dailyClaimAmount = contracts.length > 0
    ? contracts.reduce((acc, c) => acc + c.dailyIncome, 0)
    : 3000; // Pack Coltan minier de base (10 000 FC -> 3 000 FC/j)

  // Handler: 24h Daily Claim (strictly once every 24 hours, blocked if attempted multiple times per day)
  const handleDailyClaim = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Must be registered to claim daily mining income
    if (!user) {
      showToast("Veuillez d'abord créer votre compte pour recevoir vos gains et le bonus de 5 000 FC !");
      setIsAccountOpen(true);
      return;
    }

    const now = Date.now();
    // Strict 24h enforcement check
    if (lastClaimTimestamp && now - lastClaimTimestamp < CLAIM_COOLDOWN_MS) {
      const left = CLAIM_COOLDOWN_MS - (now - lastClaimTimestamp);
      const h = Math.floor(left / (1000 * 60 * 60));
      const m = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
      showToast(`Revenu du jour déjà versé ! Prochain versement dans ${h}h ${m}m (Strictement 1 versement par 24h).`);
      return;
    }

    // Credit the daily income according to products
    setWalletBalance((prev) => prev + dailyClaimAmount);
    setLastClaimTimestamp(now);
    localStorage.setItem('mine_rdc_last_claim_ts', now.toString());

    // Advance or initialize active mining contracts
    if (contracts.length === 0) {
      const starterContract: ActiveContract = {
        id: `c-coltan-${now}`,
        productId: 'coltan',
        productName: 'Coltan Standard',
        investedAmount: 10000,
        dailyIncome: 3000,
        startDate: new Date().toISOString().split('T')[0],
        durationDays: 30,
        daysElapsed: 1,
        totalCollected: 3000,
        uncollectedEarnings: 0,
        status: 'active',
      };
      setContracts([starterContract]);
    } else {
      setContracts((prev) =>
        prev.map((c) => ({
          ...c,
          totalCollected: c.totalCollected + c.dailyIncome,
          uncollectedEarnings: 0,
          daysElapsed: Math.min(c.durationDays, c.daysElapsed + 1),
        }))
      );
    }

    const newTx: Transaction = {
      id: `tx-gain-${now}`,
      type: 'mining_gain',
      amount: dailyClaimAmount,
      timestamp: 'À l’instant',
      status: 'success',
      reference: `DIV-24H-${now.toString().slice(-4)}`,
      description: `Dividende minier 24h (${contracts.length > 0 ? `${contracts.length} produit(s)` : 'Pack Coltan'})`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`Félicitations ! +${formatFC(dailyClaimAmount)} crédités dans votre portefeuille. Prochain versement dans 24h.`);
  };

  // Handler: Collect Unharvested Earnings
  const handleCollectEarnings = () => {
    let harvestedSum = 0;
    const updated = contracts.map((c) => {
      if (c.uncollectedEarnings > 0) {
        harvestedSum += c.uncollectedEarnings;
        return {
          ...c,
          totalCollected: c.totalCollected + c.uncollectedEarnings,
          uncollectedEarnings: 0,
        };
      }
      return c;
    });

    if (harvestedSum > 0) {
      setContracts(updated);
      setWalletBalance((prev) => prev + harvestedSum);

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'mining_gain',
        amount: harvestedSum,
        timestamp: 'À l’instant',
        status: 'success',
        reference: `GAIN-${Date.now().toString().slice(-4)}`,
        description: 'Dividendes Minier Journalier Récoltés',
      };
      setTransactions((prev) => [newTx, ...prev]);
      showToast(`+${formatFC(harvestedSum)} ajoutés à votre portefeuille !`);
    } else {
      showToast('Aucun dividende supplémentaire en attente.');
    }
  };

  // Total pending uncollected earnings
  const totalUncollectedEarnings = contracts.reduce((acc, c) => acc + c.uncollectedEarnings, 0);

  // Quick action helpers
  const handleOpenProducts = () => {
    const el = document.getElementById('produits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInvestWithAmount = (amt: number) => {
    setInvestInitialAmount(amt);
    setIsInvestOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Notification Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 border border-amber-300">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header with MINE RDC logo top-left and 5000f button with embedded 24h daily credit button */}
      <Header
        walletBalance={walletBalance}
        user={user}
        canClaim24h={canClaim24h}
        timeRemaining24h={timeRemaining24h}
        dailyClaimAmount={dailyClaimAmount}
        onDailyClaim={handleDailyClaim}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenInvest={() => {
          setInvestInitialAmount(10000);
          setIsInvestOpen(true);
        }}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
        onOpenProducts={handleOpenProducts}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with the 3 Action Buttons: Voir les Produits, Investir, Retrait */}
        <Hero
          onOpenProducts={handleOpenProducts}
          onOpenInvest={() => {
            setInvestInitialAmount(10000);
            setIsInvestOpen(true);
          }}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />

        {/* Full Products Section: Coltan, Cuivre, Diamant, Or, Manganèse */}
        <ProductsSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenInvest={() => {
            setInvestInitialAmount(10000);
            setIsInvestOpen(true);
          }}
        />

        {/* Profit Simulator right on the homepage */}
        <ProfitCalculator
          onInvestAmount={(amount) => handleOpenInvestWithAmount(amount)}
        />

        {/* Dedicated Account Creation Section for Withdrawals */}
        <AccountSection
          user={user}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
        />

        {/* Real Testimonial Proofs & Live Withdrawals in DR Congo */}
        <TestimonialsSection />

        {/* 4-Step Investment Process Guide */}
        <HowItWorksSection
          onOpenInvest={() => {
            setInvestInitialAmount(10000);
            setIsInvestOpen(true);
          }}
          onOpenProducts={handleOpenProducts}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS */}

      {/* 1. Wallet Balance Modal with 24h Daily Revenue Status & Countdown */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        walletBalance={walletBalance}
        user={user}
        uncollectedEarnings={totalUncollectedEarnings}
        transactions={transactions}
        canClaim24h={canClaim24h}
        timeRemaining24h={timeRemaining24h}
        dailyClaimAmount={dailyClaimAmount}
        onDailyClaim={() => handleDailyClaim()}
        onOpenInvest={() => {
          setInvestInitialAmount(10000);
          setIsInvestOpen(true);
        }}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onCollectEarnings={handleCollectEarnings}
      />

      {/* 2. Invest Modal with Official Number +243 974017803 */}
      <InvestModal
        isOpen={isInvestOpen}
        onClose={() => setIsInvestOpen(false)}
        onConfirmDeposit={handleConfirmDeposit}
        initialAmount={investInitialAmount}
      />

      {/* 3. Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        walletBalance={walletBalance}
        user={user}
        onOpenAccount={() => setIsAccountOpen(true)}
        onConfirmWithdrawal={handleConfirmWithdrawal}
      />

      {/* 4. Account Modal (Nom, Prénom, Téléphone, Mot de passe) */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
        onSaveAccount={(newAccount) => {
          const isFirstCreation = !user;
          setUser(newAccount);
          if (isFirstCreation) {
            setWalletBalance(5000); // Exclusively 5000f bonus credited upon inscription
            const bonusTx: Transaction = {
              id: `tx-bonus-${Date.now()}`,
              type: 'bonus',
              amount: 5000,
              timestamp: 'À l’instant',
              status: 'success',
              reference: 'BONUS-5000FC-INSCRIPTION',
              description: 'Bonus de 5 000 FC offert après inscription',
            };
            setTransactions((prev) => [bonusTx, ...prev]);
            showToast(`Félicitations ${newAccount.prenom} ! Votre portefeuille affiche désormais votre bonus de 5 000 FC (5000f) ! Retrait dès 1 000 FC.`);
          } else {
            showToast(`Profil mis à jour pour ${newAccount.prenom} ${newAccount.nom} !`);
          }
        }}
        onLogout={() => {
          setUser(null);
          setWalletBalance(0);
          localStorage.removeItem('mine_rdc_user');
          localStorage.removeItem('mine_rdc_wallet');
          showToast('Déconnecté. Le portefeuille affiche 0 FC jusqu\'à votre prochaine connexion.');
        }}
      />

      {/* 5. Product Purchase / Activation Modal */}
      <ProductPurchaseModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        walletBalance={walletBalance}
        onConfirmPurchase={handleConfirmPurchase}
        onOpenInvest={(amt) => handleOpenInvestWithAmount(amt)}
      />

      {/* 6. Mobile Application Installation / APK Creation Guide Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

    </div>
  );
}
