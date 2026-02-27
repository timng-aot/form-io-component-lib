import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface DayFieldProps {
  label?: string;
  required?: boolean;
  description?: string;
}

export function DayField({
  label = 'Day',
  required = false,
  description,
}: DayFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label className="text-sm font-normal">Month</Label>
          <Input type="text" placeholder="Month" />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-normal">Day</Label>
          <Input type="text" placeholder="Day" />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-normal">Year</Label>
          <Input type="text" placeholder="Year" />
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
