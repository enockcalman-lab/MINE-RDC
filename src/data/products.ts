import { MiningProduct } from '../types';

export const MINING_PRODUCTS: MiningProduct[] = [
  {
    id: 'coltan',
    name: 'Le Coltan (Tantalite)',
    chemicalSymbol: 'Ta-Nb',
    price: 10000,
    dailyIncome: 3000,
    durationDays: 30,
    totalReturn: 90000, // 3000 * 30
    maxPurchaseCount: 5,
    image: '/src/assets/images/mineral_coltan_ore_1793795260274.jpg',
    tagline: 'Minéral stratégique pour l’industrie des smartphones et satellites.',
    region: 'Nord-Kivu / Maniema',
    highlight: false,
  },
  {
    id: 'cuivre',
    name: 'Le Cuivre Pur (Cathode)',
    chemicalSymbol: 'Cu',
    price: 20000,
    dailyIncome: 6500,
    durationDays: 30,
    totalReturn: 195000, // 6500 * 30
    maxPurchaseCount: 4,
    image: '/src/assets/images/mineral_copper_ore_1793795260637.jpg',
    tagline: 'Le métal rouge indispensable à la transition énergétique mondiale.',
    region: 'Kolwezi / Haut-Katanga',
    highlight: true,
  },
  {
    id: 'diamant',
    name: 'Le Diamant Brut',
    chemicalSymbol: 'C (Carat)',
    price: 50000,
    dailyIncome: 17000,
    durationDays: 30,
    totalReturn: 510000, // 17000 * 30
    maxPurchaseCount: 3,
    image: '/src/assets/images/mineral_rough_diamond_1793795260701.jpg',
    tagline: 'Gemme précieuse à très haute valeur ajoutée internationale.',
    region: 'Mbuji-Mayi / Kasaï-Oriental',
    highlight: false,
  },
  {
    id: 'or',
    name: 'L’Or Raffiné (24K)',
    chemicalSymbol: 'Au',
    price: 100000,
    dailyIncome: 36000,
    durationDays: 30,
    totalReturn: 1080000, // 36000 * 30
    maxPurchaseCount: 2,
    image: '/src/assets/images/mineral_copper_ore_1793795260637.jpg',
    tagline: 'La valeur refuge suprême garantie par les gisements aurifères de l’Ituri.',
    region: 'Mongbwalu / Haut-Uélé',
    highlight: false,
  },
  {
    id: 'manganese',
    name: 'Le Manganèse Haute Pureté',
    chemicalSymbol: 'Mn',
    price: 200000,
    dailyIncome: 75000,
    durationDays: 30,
    totalReturn: 2250000, // 75000 * 30
    maxPurchaseCount: 2,
    image: '/src/assets/images/mineral_coltan_ore_1793795260274.jpg',
    tagline: 'Composant clé pour les batteries de nouvelle génération et l’acier trempé.',
    region: 'Lualaba / Grand Katanga',
    highlight: false,
  },
  {
    id: 'cobalt',
    name: 'Le Cobalt Royal (Grade Batterie)',
    chemicalSymbol: 'Co',
    price: 500000,
    dailyIncome: 200000,
    durationDays: 30,
    totalReturn: 6000000, // 200000 * 30
    maxPurchaseCount: 1,
    image: '/src/assets/images/mine_rdc_hero_1793795259477.jpg',
    tagline: 'Contrat Minier Haute Catégorie pour investisseurs à fort capital.',
    region: 'Fungurume / Lualaba',
    highlight: false,
  },
];

export const OFFICIAL_INVESTMENT_PHONE = '+243 974017803';
export const OFFICIAL_PHONE_DISPLAY = '+243 974 017 803';
