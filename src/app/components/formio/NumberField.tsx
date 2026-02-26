import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface NumberFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberField({
  label,
  placeholder,
  required = false,
  description,
  value,
  onChange,
  min,
  max,
  step = 1
}: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
