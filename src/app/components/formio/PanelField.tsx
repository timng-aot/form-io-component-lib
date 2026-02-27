import React from 'react';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor } from '../CustomizationPanel';

interface PanelFieldProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const HEADER_FONTS: Record<string, { family: string; weight?: number }> = {
  'sans': { family: 'Figtree, sans-serif' },
  'heavy-sans': { family: 'Figtree, sans-serif', weight: 600 },
  'serif': { family: "'Libre Baskerville', serif" },
  'mono': { family: "'DM Mono', monospace" },
  'slab': { family: "'Roboto Slab', serif" },
};

export function PanelField({ title, description, children }: PanelFieldProps) {
  const { accentColor, headerFont } = useCustomization();
  const headingTextColor = getContrastColor(accentColor);
  const headerFontStyle = HEADER_FONTS[headerFont];

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Accent heading bar */}
      <div
        className="px-6 py-4"
        style={{ backgroundColor: accentColor }}
      >
        <h3 className="text-lg font-medium" style={{
          color: headingTextColor,
          fontFamily: headerFontStyle?.family,
          fontWeight: headerFontStyle?.weight,
        }}>
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
