import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface AddressFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  value?: Address;
  onChange?: (address: Address) => void;
}

export function AddressField({
  label,
  required = false,
  description,
  value = {},
  onChange
}: AddressFieldProps) {
  const handleChange = (field: keyof Address, fieldValue: string) => {
    onChange?.({ ...value, [field]: fieldValue });
  };

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      <div className="space-y-3 border rounded-md p-4">
        <div>
          <Label className="text-sm">Street Address</Label>
          <Input
            type="text"
            placeholder="123 Main St"
            value={value.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm">City</Label>
            <Input
              type="text"
              placeholder="New York"
              value={value.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm">State</Label>
            <Input
              type="text"
              placeholder="NY"
              value={value.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm">Zip Code</Label>
            <Input
              type="text"
              placeholder="10001"
              value={value.zip || ''}
              onChange={(e) => handleChange('zip', e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm">Country</Label>
            <Input
              type="text"
              placeholder="USA"
              value={value.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
