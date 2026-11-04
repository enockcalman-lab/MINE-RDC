export interface MiningProduct {
  id: string;
  name: string;
  chemicalSymbol: string;
  price: number; // in FC
  dailyIncome: number; // in FC
  durationDays: number; // 60 days
  totalReturn: number; // dailyIncome * durationDays
  maxPurchaseCount: number; // how many times user can purchase
  image: string;
  tagline: string;
  region: string;
  highlight?: boolean;
}

export interface UserAccount {
  id: string;
  nom: string;
  prenom: string;
  phone: string;
  password?: string;
  operator?: 'airtel' | 'mpesa' | 'orange' | 'afrimoney';
  createdAt: string;
}

export interface ActiveContract {
  id: string;
  productId: string;
  productName: string;
  investedAmount: number;
  dailyIncome: number;
  startDate: string;
  durationDays: number;
  daysElapsed: number;
  totalCollected: number;
  uncollectedEarnings: number;
  status: 'active' | 'completed';
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'mining_gain' | 'bonus';
  amount: number;
  timestamp: string;
  status: 'success' | 'pending';
  reference: string;
  description: string;
  operator?: string;
}

export interface ProofTestimonial {
  id: string;
  name: string;
  city: string;
  province: string;
  phoneMasked: string;
  avatar: string;
  productInvested: string;
  amountInvested: number;
  amountReceived: number;
  date: string;
  operator: 'Airtel Money' | 'M-Pesa' | 'Orange Money' | 'Afrimoney';
  operatorColor: string;
  transactionRef: string;
  comment: string;
  verified: boolean;
}
