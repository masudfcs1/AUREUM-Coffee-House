import { BuilderConfig } from '@/store/useBuilderStore';

const BASE_PRICES: Record<string, number> = {
  Espresso: 3.5,
  Latte: 4.5,
  Cappuccino: 4.5,
  Mocha: 5.0,
  Americano: 3.0,
  'Cold Brew': 4.5,
  Macchiato: 4.0,
  'Flat White': 4.5,
};

const SIZE_PRICES: Record<string, number> = {
  S: 0,
  M: 0.5,
  L: 1.0,
  XL: 1.5,
};

const MILK_PRICES: Record<string, number> = {
  Whole: 0,
  Skim: 0,
  Oat: 0.6,
  Almond: 0.6,
  Coconut: 0.6,
  Soy: 0.5,
};

const FLAVOR_PRICE = 0.5;
const ADDON_PRICE = 0.7;

const BREW_PRICES: Record<string, number> = {
  'Espresso Machine': 0,
  'French Press': 0.5,
  'Pour Over': 1.0,
  AeroPress: 0.5,
};

export const calculatePrice = (config: BuilderConfig): number => {
  let price = BASE_PRICES[config.base] || 4.0;
  price += SIZE_PRICES[config.size] || 0;
  price += MILK_PRICES[config.milk] || 0;
  price += config.flavors.length * FLAVOR_PRICE;
  price += config.addons.length * ADDON_PRICE;
  price += BREW_PRICES[config.brewMethod] || 0;

  return Math.round(price * 100) / 100;
};

export const getFlavorProfile = (config: BuilderConfig) => {
  let sweet = config.sweetness;
  let bitter = 100 - config.sweetness;
  let strong = 50;

  if (config.base === 'Espresso') {
    bitter += 20;
    strong += 30;
  } else if (config.base === 'Mocha') {
    sweet += 15;
  } else if (config.base === 'Cold Brew') {
    bitter += 10;
    strong += 15;
  } else if (config.base === 'Americano') {
    bitter += 15;
    strong += 10;
  }

  if (config.flavors.includes('Caramel')) sweet += 10;
  if (config.flavors.includes('Vanilla')) sweet += 8;
  if (config.flavors.includes('Hazelnut')) sweet += 5;
  if (config.flavors.includes('Chocolate')) sweet += 12;

  if (config.addons.includes('Extra Shot')) {
    strong += 20;
    bitter += 10;
  }

  if (config.milk === 'Oat' || config.milk === 'Coconut') sweet += 5;

  return {
    sweet: Math.min(100, Math.max(0, sweet)),
    bitter: Math.min(100, Math.max(0, bitter)),
    strong: Math.min(100, Math.max(0, strong)),
  };
};

export interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  strength: number;
  flavorNotes: string[];
  origin: string;
  tag?: 'Bestseller' | 'Signature' | 'New';
  roastLevel: number;
}

export const COFFEE_MENU: CoffeeItem[] = [
  {
    id: 'espresso-01',
    name: 'Classic Espresso',
    description: 'A bold, concentrated shot with rich crema and deep intensity.',
    price: 3.5,
    image: '/images/espresso.png',
    strength: 5,
    flavorNotes: ['Bold', 'Nutty', 'Dark Chocolate'],
    origin: 'Colombia',
    tag: 'Bestseller',
    roastLevel: 4,
  },
  {
    id: 'latte-01',
    name: 'Caramel Latte',
    description: 'Silky steamed milk with espresso, finished with golden caramel drizzle.',
    price: 5.0,
    image: '/images/latte.png',
    strength: 2,
    flavorNotes: ['Caramel', 'Creamy', 'Smooth'],
    origin: 'Brazil',
    tag: 'Signature',
    roastLevel: 2,
  },
  {
    id: 'cappuccino-01',
    name: 'Velvet Cappuccino',
    description: 'Perfect balance of espresso, steamed milk, and thick velvety foam.',
    price: 4.5,
    image: '/images/cappuccino.png',
    strength: 3,
    flavorNotes: ['Chocolate', 'Nutty', 'Balanced'],
    origin: 'Ethiopia',
    tag: 'Bestseller',
    roastLevel: 3,
  },
  {
    id: 'coldbrew-01',
    name: 'Midnight Cold Brew',
    description: 'Slow-steeped for 20 hours, delivering a smooth, strong finish.',
    price: 4.5,
    image: '/images/coldbrew.png',
    strength: 4,
    flavorNotes: ['Smooth', 'Bold', 'Cocoa'],
    origin: 'Guatemala',
    tag: 'New',
    roastLevel: 3,
  },
  {
    id: 'mocha-01',
    name: 'Dark Mocha',
    description: 'Rich espresso meets premium dark chocolate and steamed milk.',
    price: 5.5,
    image: '/images/mocha.png',
    strength: 3,
    flavorNotes: ['Chocolate', 'Rich', 'Sweet'],
    origin: 'Peru',
    tag: 'Signature',
    roastLevel: 3,
  },
  {
    id: 'americano-01',
    name: 'Golden Americano',
    description: 'Pure espresso stretched with hot water for a clean, powerful taste.',
    price: 3.0,
    image: '/images/hero-coffee.png',
    strength: 4,
    flavorNotes: ['Clean', 'Bright', 'Citrus'],
    origin: 'Kenya',
    roastLevel: 2,
  },
];

export interface PairingItem {
  id: string;
  coffee: string;
  food: string;
  description: string;
  image: string;
  discount: number;
  comboPrice: number;
}

export const PAIRINGS: PairingItem[] = [
  {
    id: 'combo-01',
    coffee: 'Caramel Latte',
    food: 'Butter Croissant',
    description: 'The golden standard of morning indulgence.',
    image: '/images/croissant-pairing.png',
    discount: 15,
    comboPrice: 7.5,
  },
  {
    id: 'combo-02',
    coffee: 'Dark Mocha',
    food: 'Chocolate Brownie',
    description: 'Double chocolate heaven for the sweet tooth.',
    image: '/images/mocha.png',
    discount: 10,
    comboPrice: 8.0,
  },
  {
    id: 'combo-03',
    coffee: 'Classic Espresso',
    food: 'Tiramisu',
    description: 'Italian perfection—bold coffee meets creamy mascarpone.',
    image: '/images/espresso.png',
    discount: 12,
    comboPrice: 9.0,
  },
];

export const RECOMMENDATIONS: { time: string; greeting: string; coffees: string[] }[] = [
  {
    time: 'morning',
    greeting: 'Good Morning! Ready for a Fresh Brew?',
    coffees: ['Classic Espresso', 'Golden Americano', 'Velvet Cappuccino'],
  },
  {
    time: 'afternoon',
    greeting: 'Afternoon Pick-Me-Up?',
    coffees: ['Caramel Latte', 'Midnight Cold Brew', 'Velvet Cappuccino'],
  },
  {
    time: 'evening',
    greeting: 'Wind Down with Something Special',
    coffees: ['Dark Mocha', 'Caramel Latte', 'Dark Mocha'],
  },
];
