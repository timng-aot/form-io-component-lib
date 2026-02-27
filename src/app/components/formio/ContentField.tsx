import React from 'react';
import { useCustomization } from '../CustomizationContext';

interface ContentFieldProps {
  html: string;
}

export function ContentField({ html }: ContentFieldProps) {
  const { accentColor } = useCustomization();

  return (
    <div
      className="prose max-w-none pl-4"
      style={{ borderLeft: `3px solid ${accentColor}` }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
