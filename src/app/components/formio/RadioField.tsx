import React, { useState } from 'react';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useCustomization } from '../CustomizationContext';

interface RadioFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function RadioField({
  label,
  required = false,
  description,
  options,
  value,
  onChange
}: RadioFieldProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>();
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const { buttonColor } = useCustomization();
  const radioStyle = { '--radio-color': buttonColor } as React.CSSProperties;

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <RadioGroup value={currentValue} onValueChange={handleChange}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} style={radioStyle} />
            <Label htmlFor={option.value} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
