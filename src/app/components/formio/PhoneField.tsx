import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface PhoneFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function PhoneField({
  label,
  placeholder = '(555) 555-5555',
  required = false,
  description,
  value,
  onChange
}: PhoneFieldProps) {
  const [touched, setTouched] = useState(false);
  const hasError = touched && !!value && !/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value);

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={() => setTouched(true)}
        className={hasError ? 'border-destructive' : ''}
      />
      {hasError && (
        <p className="text-sm text-destructive">Phone Number does not match the mask.</p>
      )}
      {!hasError && description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
