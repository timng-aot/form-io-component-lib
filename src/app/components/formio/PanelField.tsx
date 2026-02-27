import React from 'react';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor } from '../CustomizationPanel';

interface PanelFieldProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PanelField({ title, description, children }: PanelFieldProps) {
  const { accentColor } = useCustomization();
  const headingTextColor = getContrastColor(accentColor);

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Accent heading bar */}
      <div
        className="px-6 py-4"
        style={{ backgroundColor: accentColor }}
      >
        <h3 className="text-lg font-medium" style={{ color: headingTextColor }}>
          {title}
        </h3>
        {description && (
          <p className="text-sm mt-1" style={{ color: headingTextColor, opacity: 0.85 }}>
            {description}
          </p>
        )}
      </div>
      {/* Panel body */}
      <div className="px-6 py-4" style={{ backgroundColor: '#FFFFFF' }}>
        {children}
      </div>
    </div>
  );
}
