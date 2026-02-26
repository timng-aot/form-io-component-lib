import React from 'react';

interface HiddenFieldProps {
  value?: string;
}

export function HiddenField({ value }: HiddenFieldProps) {
  return <input type="hidden" value={value} />;
}
