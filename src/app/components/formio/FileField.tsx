import React, { useRef } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Upload, X } from 'lucide-react';

interface FileFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  accept?: string;
  multiple?: boolean;
  value?: File[];
  onChange?: (files: File[]) => void;
}

export function FileField({
  label,
  required = false,
  description,
  accept,
  multiple = false,
  value = [],
  onChange
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange?.(multiple ? [...value, ...files] : files);
  };

  const removeFile = (index: number) => {
    if (onChange) {
      onChange(value.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose File{multiple ? 's' : ''}
        </Button>
        {value.length > 0 && (
          <div className="space-y-2">
            {value.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(idx)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}