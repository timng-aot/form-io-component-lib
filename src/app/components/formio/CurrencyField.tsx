import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface CurrencyFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  value?: number;
  onChange?: (value: number) => void;
  currency?: string;
}

export function CurrencyField({
  label,
  placeholder = '0.00',
  required = false,
  description,
  value,
  onChange,
  currency = '$'
}: CurrencyFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {currency}
        </span>
        <Input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(parseFloat(e.target.value))}
          className="pl-8"
          step="0.01"
        />
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
