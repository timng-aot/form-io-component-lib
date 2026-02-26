import React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface TextAreaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

export function TextAreaComponent({
  label,
  placeholder,
  required = false,
  description,
  value,
  onChange,
  rows = 4
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
      />
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
