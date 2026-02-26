import React from 'react';
import { Button } from '../ui/button';
import { useCustomization } from '../CustomizationContext';

interface ButtonFieldProps {
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
}

export function ButtonField({
  label,
  variant = 'default',
  size = 'default',
  onClick,
  disabled = false
}: ButtonFieldProps) {
  const customization = useCustomization();
  
  const customStyle = variant === 'default' ? {
    backgroundColor: customization.buttonColor,
    borderRadius: customization.buttonStyle === 'pill' ? '9999px' : '0.375rem',
  } : {};

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={onClick} 
      disabled={disabled}
      style={customStyle}
    >
      {label}
    </Button>
  );
}