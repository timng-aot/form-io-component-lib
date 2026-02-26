import React from 'react';

interface ColumnsFieldProps {
  columns: number;
  children: React.ReactNode;
}

export function ColumnsField({ columns, children }: ColumnsFieldProps) {
  const childArray = React.Children.toArray(children);
  
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      {childArray.map((child, idx) => (
        <div key={idx}>{child}</div>
      ))}
    </div>
  );
}