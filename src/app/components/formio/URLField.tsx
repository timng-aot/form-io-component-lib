import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface URLFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function URLField({
  label,
  placeholder = 'https://example.com',
  required = false,
  description,
  value,
  onChange
}: URLFieldProps) {
  const [touched, setTouched] = useState(false);
  const hasError = touched && !!value && !/^https?:\/\/.+\..+/.test(value);

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type="url"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={() => setTouched(true)}
        className={hasError ? 'border-destructive' : ''}
      />
      {hasError && (
        <p className="text-xs text-destructive">Url must be a valid url.</p>
      )}
      {!hasError && description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
