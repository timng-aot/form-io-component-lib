import React, { useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useCustomization } from '../CustomizationContext';
import { getContrastColor } from '../CustomizationPanel';

interface DateTimeFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

function TimePicker({
  date,
  onTimeChange,
}: {
  date: Date | undefined;
  onTimeChange: (hours: number, minutes: number) => void;
}) {
  const hours24 = date ? date.getHours() : 12;
  const minutes = date ? date.getMinutes() : 0;
  const isPM = hours24 >= 12;
  const hours12 = hours24 % 12 || 12;

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    const clamped = Math.max(1, Math.min(12, val));
    const newHours24 = isPM ? (clamped % 12) + 12 : clamped % 12;
    onTimeChange(newHours24, minutes);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    const clamped = Math.max(0, Math.min(59, val));
    onTimeChange(hours24, clamped);
  };

  const toggleAmPm = () => {
    const newHours = isPM ? hours24 - 12 : hours24 + 12;
    onTimeChange(newHours, minutes);
  };

  return (
    <div className="flex items-center justify-center gap-1 border-t border-border px-3 py-2">
      <input
        type="text"
        inputMode="numeric"
        value={String(hours12)}
        onChange={handleHourChange}
        className="w-10 rounded border border-border bg-input-background px-1 py-0.5 text-center text-sm"
        aria-label="Hour"
      />
      <span className="text-sm font-medium">:</span>
      <input
        type="text"
        inputMode="numeric"
        value={String(minutes).padStart(2, '0')}
        onChange={handleMinuteChange}
        className="w-10 rounded border border-border bg-input-background px-1 py-0.5 text-center text-sm"
        aria-label="Minute"
      />
      <button
        type="button"
        onClick={toggleAmPm}
        className="ml-1 rounded border border-border bg-input-background px-2 py-0.5 text-sm font-medium hover:bg-muted"
        aria-label="Toggle AM/PM"
      >
        {isPM ? 'PM' : 'AM'}
      </button>
    </div>
  );
}

export function DateTimeField({
  label,
  required = false,
  description,
  value,
  onChange,
}: DateTimeFieldProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const { buttonColor } = useCustomization();
  const buttonTextColor = getContrastColor(buttonColor);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleChange = (date: Date | undefined) => {
    if (!date) {
      if (!isControlled) setInternalValue(undefined);
      onChange?.(undefined);
      return;
    }
    const merged = new Date(date);
    if (currentValue) {
      merged.setHours(currentValue.getHours(), currentValue.getMinutes(), 0, 0);
    } else {
      merged.setHours(12, 0, 0, 0);
    }
    if (!isControlled) setInternalValue(merged);
    onChange?.(merged);
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    const base = currentValue ? new Date(currentValue) : new Date();
    base.setHours(hours, minutes, 0, 0);
    if (!isControlled) setInternalValue(base);
    onChange?.(base);
  };

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex w-full items-center justify-start rounded-md border border-input bg-background px-4 py-2 text-sm font-normal text-left hover:bg-accent hover:text-accent-foreground"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {currentValue ? (
            format(currentValue, 'MMM d, yyyy h:mm a')
          ) : (
            <span className="text-muted-foreground">Pick a date</span>
          )}
        </button>
        {open && (
          <div className="absolute left-1/2 z-50 mt-1 -translate-x-1/2 rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
            <Calendar
              mode="single"
              selected={currentValue}
              onSelect={handleChange}
              classNames={{
                day_today:
                  'border-2 border-foreground bg-transparent text-foreground font-medium',
                day_selected:
                  'text-white hover:text-white focus:text-white',
                day_outside: 'text-muted-foreground opacity-50',
              }}
              modifiersStyles={{
                selected: {
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                },
              }}
            />
            <TimePicker date={currentValue} onTimeChange={handleTimeChange} />
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
