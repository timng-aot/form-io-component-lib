import React from 'react';
import { Label } from '../ui/label';

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
      <table className="w-full border-collapse rounded-md overflow-hidden border border-border">
        <thead>
          <tr className="bg-white">
            <th className="border px-4 py-3 text-left font-normal" />
            {options.map((option) => (
              <th key={option} className="border px-4 py-3 text-center font-semibold text-sm">
                {option}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((question, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"}>
              <td className="border px-4 py-3 text-sm font-medium">{question}</td>
              {options.map((option) => (
                <td key={option} className="border px-4 py-3 text-center">
                  <input
                    type="radio"
                    name={`survey-${label}-${idx}`}
                    checked={value[question] === option}
                    onChange={() => handleChange(question, option)}
                    className="size-4 accent-primary cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
