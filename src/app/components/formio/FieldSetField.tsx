import React from 'react';

interface FieldSetFieldProps {
  legend: string;
  children: React.ReactNode;
}

export function FieldSetField({ legend, children }: FieldSetFieldProps) {
  return (
    <fieldset className="border rounded-md p-4 space-y-4">
      <legend className="px-2 font-medium">{legend}</legend>
      {children}
    </fieldset>
  );
}
