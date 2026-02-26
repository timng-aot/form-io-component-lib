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
      backgroundColor: '#F9FAFB',
      buttonColor: '#3B82F6',
      headerTextColor: '#000000',
    };
  }
  return context;
};

export const CustomizationProvider = CustomizationContext.Provider;
