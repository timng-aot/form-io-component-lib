import React from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface DataGridFieldProps {
  label: string;
  columns: { key: string; label: string }[];
  required?: boolean;
  description?: string;
  value?: Record<string, any>[];
  onChange?: (data: Record<string, any>[]) => void;
  renderCell: (row: Record<string, any>, column: string, onChange: (value: any) => void) => React.ReactNode;
}

export function DataGridField({
  label,
  columns,
  required = false,
  description,
  value = [],
  onChange,
  renderCell
}: DataGridFieldProps) {
  const addRow = () => {
    const newRow: Record<string, any> = {};
    columns.forEach(col => newRow[col.key] = '');
    onChange?.([...value, newRow]);
  };

  const removeRow = (index: number) => {
    if (onChange) {
      onChange(value.filter((_, idx) => idx !== index));
    }
  };

  const updateCell = (rowIndex: number, columnKey: string, cellValue: any) => {
    const newData = [...value];
    newData[rowIndex] = { ...newData[rowIndex], [columnKey]: cellValue };
    if (onChange) {
      onChange(newData);
    }
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
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {renderCell(row, col.key, (cellValue) =>
                      updateCell(rowIndex, col.key, cellValue)
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(rowIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button type="button" variant="outline" onClick={addRow} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Row
      </Button>
    </div>
  );
}