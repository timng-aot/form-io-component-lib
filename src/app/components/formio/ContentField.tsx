import React from 'react';

interface ContentFieldProps {
  html: string;
}

export function ContentField({ html }: ContentFieldProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
