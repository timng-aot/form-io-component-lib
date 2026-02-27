import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor } from '../CustomizationPanel';

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
  const [hovered, setHovered] = useState(false);

  const borderRadius = customization.buttonStyle === 'pill' ? '9999px' : '0.3125rem';
  const textColor = getContrastColor(customization.buttonColor);

  const customStyle = variant === 'default' ? (
    hovered ? {
      backgroundColor: 'transparent',
      color: customization.buttonColor,
      borderColor: customization.buttonColor,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius,
    } : {
      backgroundColor: customization.buttonColor,
      color: textColor,
      borderColor: customization.buttonColor,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius,
    }
  ) : {};

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      style={customStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Button>
  );
}
