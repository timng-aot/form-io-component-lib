import { createContext, useContext } from 'react';
import { CustomizationSettings } from './CustomizationPanel';

const CustomizationContext = createContext<CustomizationSettings | null>(null);

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    return {
      headerFont: 'sans',
      bodyFont: 'sans',
      buttonStyle: 'rounded' as const,
      backgroundColor: '#FFFFFF',
      buttonColor: '#000000',
      accentColor: '#D9D9D9',
    };
  }
  return context;
};

export const CustomizationProvider = CustomizationContext.Provider;
