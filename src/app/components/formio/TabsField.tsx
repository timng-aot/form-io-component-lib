import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsFieldProps {
  tabs: Tab[];
}

export function TabsField({ tabs }: TabsFieldProps) {
  return (
    <Tabs defaultValue="0">
      <TabsList>
        {tabs.map((tab, idx) => (
          <TabsTrigger key={idx} value={idx.toString()}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, idx) => (
        <TabsContent key={idx} value={idx.toString()} className="space-y-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
