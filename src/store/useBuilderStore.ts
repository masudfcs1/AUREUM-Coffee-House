import { create } from 'zustand';

export interface BuilderConfig {
  base: string;
  size: string;
  milk: string;
  sweetness: number;
  flavors: string[];
  addons: string[];
  brewMethod: string;
  grindSize: string;
  temperature: string;
  customName: string;
}

interface BuilderState {
  config: BuilderConfig;
  activeStep: number;
  isOpen: boolean;
  update: <K extends keyof BuilderConfig>(key: K, value: BuilderConfig[K]) => void;
  toggleFlavor: (flavor: string) => void;
  toggleAddon: (addon: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
  openBuilder: () => void;
  closeBuilder: () => void;
}

const defaultConfig: BuilderConfig = {
  base: 'Latte',
  size: 'M',
  milk: 'Whole',
  sweetness: 50,
  flavors: [],
  addons: [],
  brewMethod: 'Espresso Machine',
  grindSize: 'Fine',
  temperature: 'Hot',
  customName: '',
};

export const useBuilderStore = create<BuilderState>((set) => ({
  config: { ...defaultConfig },
  activeStep: 0,
  isOpen: false,

  update: (key, value) =>
    set((state) => ({
      config: { ...state.config, [key]: value },
    })),

  toggleFlavor: (flavor) =>
    set((state) => ({
      config: {
        ...state.config,
        flavors: state.config.flavors.includes(flavor)
          ? state.config.flavors.filter((f) => f !== flavor)
          : [...state.config.flavors, flavor],
      },
    })),

  toggleAddon: (addon) =>
    set((state) => ({
      config: {
        ...state.config,
        addons: state.config.addons.includes(addon)
          ? state.config.addons.filter((a) => a !== addon)
          : [...state.config.addons, addon],
      },
    })),

  setStep: (step) => set({ activeStep: step }),
  reset: () => set({ config: { ...defaultConfig }, activeStep: 0 }),
  openBuilder: () => set({ isOpen: true }),
  closeBuilder: () => set({ isOpen: false, config: { ...defaultConfig }, activeStep: 0 }),
}));
