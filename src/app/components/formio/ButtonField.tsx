import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor, darkenColor } from '../CustomizationPanel';

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
  const hoverColor = darkenColor(customization.buttonColor, 0.8);

  const customStyle = variant === 'default' ? {
    backgroundColor: hovered ? hoverColor : customization.buttonColor,
    color: textColor,
    borderColor: hovered ? hoverColor : customization.buttonColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius,
  } : {};

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
