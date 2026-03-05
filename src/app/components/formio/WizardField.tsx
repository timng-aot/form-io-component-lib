import React, { useState } from 'react';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor } from '../CustomizationPanel';
import { ButtonField } from './ButtonField';

interface WizardPage {
  title: string;
  children: React.ReactNode;
}

interface WizardFieldProps {
  pages: WizardPage[];
}

const HEADER_FONTS: Record<string, { family: string; weight?: number }> = {
  'sans': { family: 'Figtree, sans-serif' },
  'heavy-sans': { family: 'Figtree, sans-serif', weight: 600 },
  'serif': { family: "'Libre Baskerville', serif" },
  'mono': { family: "'DM Mono', monospace" },
  'slab': { family: "'Roboto Slab', serif" },
};

export function WizardField({ pages }: WizardFieldProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { accentColor, buttonColor, headerFont } = useCustomization();
  const accentTextColor = getContrastColor(accentColor);
  const buttonTextColor = getContrastColor(buttonColor);
  const headerFontStyle = HEADER_FONTS[headerFont];
  const isLast = currentPage === pages.length - 1;
  const isFirst = currentPage === 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb button group */}
      <nav className="inline-flex rounded-[5px] overflow-hidden" style={{ border: `1px solid ${buttonColor}` }}>
        {pages.map((page, idx) => {
          const isActive = idx === currentPage;
          return (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`text-sm px-4 py-2 whitespace-nowrap transition-colors ${isActive ? 'font-medium' : 'bg-white'}`}
              style={{
                ...(idx > 0 ? { borderLeft: `1px solid ${buttonColor}` } : {}),
                ...(isActive
                  ? { backgroundColor: buttonColor, color: buttonTextColor }
                  : { color: buttonColor }),
              }}
            >
              {page.title}
            </button>
          );
        })}
      </nav>

      {/* Page content */}
      <div className="space-y-4">
        {pages[currentPage].children}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t">
        <div>
          {!isFirst && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-6 py-2 text-sm rounded-[5px] border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
        </div>
        <div>
          {isLast ? (
            <ButtonField label="Submit" />
          ) : (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-6 py-2 text-sm rounded-[5px] transition-colors"
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
