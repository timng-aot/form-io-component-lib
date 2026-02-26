import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface TextFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function TextField({
  label,
  placeholder,
  required = false,
  description,
  value,
  onChange,
  disabled = false
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
