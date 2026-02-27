import React from 'react';

interface ColumnsFieldProps {
  columns: number;
  children: React.ReactNode;
}

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      result.push(...flattenChildren(child.props.children));
    } else {
      result.push(child);
    }
  });
  return result;
}

export function ColumnsField({ columns, children }: ColumnsFieldProps) {
  const childArray = flattenChildren(children);

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
