import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor } from '../CustomizationPanel';

interface CheckboxFieldProps {
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function CheckboxField({
  label,
  description,
  checked,
  onChange
}: CheckboxFieldProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (val: boolean) => {
    if (!isControlled) setInternalChecked(val);
    onChange?.(val);
  };

  const { buttonColor } = useCustomization();
  const checkboxStyle = {
    '--checkbox-color': buttonColor,
    '--checkbox-check-color': getContrastColor(buttonColor),
  } as React.CSSProperties;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={label}
          checked={currentChecked}
          onCheckedChange={(checked) => handleChange(checked as boolean)}
          style={checkboxStyle}
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
