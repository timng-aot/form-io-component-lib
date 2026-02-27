import React, { useRef } from 'react';
import { Label } from '../ui/label';
import { CloudUpload, X } from 'lucide-react';

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
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      {/* File list table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">File Name</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">Size</th>
            </tr>
          </thead>
          {value.length > 0 && (
            <tbody>
              {value.map((file, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2 text-sm">{file.name}</td>
                  <td className="px-4 py-2 text-sm text-right whitespace-nowrap">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* Drop zone */}
      <div
        className="border-2 border-dashed rounded-md py-6 flex items-center justify-center gap-2 cursor-pointer hover:border-muted-foreground transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <CloudUpload className="size-5" />
        <span className="text-sm">
          Drop files to attach, or <span className="underline font-medium">browse</span>
        </span>
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}