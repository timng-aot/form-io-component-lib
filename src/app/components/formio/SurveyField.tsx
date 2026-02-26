import React from 'react';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface SurveyFieldProps {
  label: string;
  questions: string[];
  options: string[];
  required?: boolean;
  description?: string;
  value?: Record<string, string>;
  onChange?: (answers: Record<string, string>) => void;
}

export function SurveyField({
  label,
  questions,
  options,
  required = false,
  description,
  value = {},
  onChange
}: SurveyFieldProps) {
  const handleChange = (question: string, answer: string) => {
    onChange?.({ ...value, [question]: answer });
  };

  return (
    <div className="space-y-4">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      <div className="border rounded-md p-4 space-y-4">
        <div className="grid gap-4">
          {questions.map((question, idx) => (
            <div key={idx} className="space-y-2">
              <Label className="text-sm">{question}</Label>
              <RadioGroup
                value={value[question]}
                onValueChange={(answer) => handleChange(question, answer)}
              >
                <div className="flex gap-4">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`${idx}-${option}`}
                      />
                      <Label htmlFor={`${idx}-${option}`} className="cursor-pointer text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
