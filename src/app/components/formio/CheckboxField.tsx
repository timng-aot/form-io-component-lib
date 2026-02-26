import React from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface CheckboxFieldProps {
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function CheckboxField({
  label,
  description,
  checked = false,
  onChange
}: CheckboxFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={label}
          checked={checked}
          onCheckedChange={(checked) => onChange?.(checked as boolean)}
        />
        <Label htmlFor={label} className="cursor-pointer">
          {label}
        </Label>
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
