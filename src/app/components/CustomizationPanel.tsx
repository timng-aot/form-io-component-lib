import { useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Paintbrush, Type, Circle, X } from 'lucide-react';

interface CustomizationPanelProps {
  onClose?: () => void;
  onSettingsChange: (settings: CustomizationSettings) => void;
  currentSettings: CustomizationSettings;
}

export interface CustomizationSettings {
  headerFont: string;
  bodyFont: string;
  buttonStyle: 'rounded' | 'pill';
  backgroundColor: string;
  buttonColor: string;
  headerTextColor: string;
}

const HEADER_FONTS = [
  { value: 'sans', label: 'Sans (Figtree)', family: 'Figtree, sans-serif' },
  { value: 'serif', label: 'Serif', family: 'Georgia, serif' },
  { value: 'heavy-sans', label: 'Heavy Sans', family: 'Inter, sans-serif' },
  { value: 'mono', label: 'Mono', family: 'ui-monospace, monospace' },
  { value: 'slab', label: 'Slab', family: 'Rockwell, serif' },
];

const BODY_FONTS = [
  { value: 'sans', label: 'Sans (Figtree)', family: 'Figtree, sans-serif' },
  { value: 'serif', label: 'Serif', family: 'Georgia, serif' },
  { value: 'system', label: 'System', family: 'system-ui, sans-serif' },
  { value: 'mono', label: 'Mono', family: 'ui-monospace, monospace' },
];

const BACKGROUND_COLORS = [
  { name: 'White', value: '#FFFFFF', dark: false },
  { name: 'Light Gray', value: '#F9FAFB', dark: false },
  { name: 'Warm Gray', value: '#FAFAF9', dark: false },
  { name: 'Cool Gray', value: '#F8FAFC', dark: false },
  { name: 'Blue Tint', value: '#F0F9FF', dark: false },
  { name: 'Green Tint', value: '#F0FDF4', dark: false },
  { name: 'Purple Tint', value: '#FAF5FF', dark: false },
  { name: 'Pink Tint', value: '#FDF2F8', dark: false },
];

const BUTTON_COLORS = [
  { name: 'Blue', value: '#3B82F6', dark: false },
  { name: 'Indigo', value: '#6366F1', dark: false },
  { name: 'Purple', value: '#A855F7', dark: false },
  { name: 'Pink', value: '#EC4899', dark: false },
  { name: 'Red', value: '#EF4444', dark: false },
  { name: 'Orange', value: '#F97316', dark: false },
  { name: 'Green', value: '#10B981', dark: false },
  { name: 'Teal', value: '#14B8A6', dark: false },
  { name: 'Slate', value: '#64748B', dark: false },
  { name: 'Dark Blue', value: '#1E40AF', dark: true },
  { name: 'Dark Purple', value: '#7C3AED', dark: true },
  { name: 'Dark Green', value: '#059669', dark: true },
];

const TEXT_COLORS = [
  { name: 'Black', value: '#000000', dark: false },
  { name: 'Dark Gray', value: '#1F2937', dark: false },
  { name: 'Slate', value: '#334155', dark: false },
  { name: 'Blue Gray', value: '#475569', dark: false },
  { name: 'Navy', value: '#1E3A8A', dark: false },
  { name: 'Purple', value: '#6B21A8', dark: false },
  { name: 'Indigo', value: '#3730A3', dark: false },
  { name: 'Teal', value: '#115E59', dark: false },
];

export function CustomizationPanel({ onClose, onSettingsChange, currentSettings }: CustomizationPanelProps) {
  const [settings, setSettings] = useState<CustomizationSettings>(currentSettings);
  const [customBgColor, setCustomBgColor] = useState('');
  const [customButtonColor, setCustomButtonColor] = useState('');
  const [customTextColor, setCustomTextColor] = useState('');

  const updateSettings = (updates: Partial<CustomizationSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const applyCustomColor = (type: 'background' | 'button' | 'text', color: string) => {
    if (type === 'background') {
      updateSettings({ backgroundColor: color });
      setCustomBgColor('');
    } else if (type === 'button') {
      updateSettings({ buttonColor: color });
      setCustomButtonColor('');
    } else {
      updateSettings({ headerTextColor: color });
      setCustomTextColor('');
    }
  };

  return (
    <div className="w-80 border-l bg-white h-full overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          <h2 className="font-semibold">Customize</h2>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Typography Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </CardTitle>
            <CardDescription>Choose fonts for headers and body text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Header Font</Label>
              <RadioGroup
                value={settings.headerFont}
                onValueChange={(value) => updateSettings({ headerFont: value })}
              >
                {HEADER_FONTS.map((font) => (
                  <div key={font.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={font.value} id={`header-${font.value}`} />
                    <Label
                      htmlFor={`header-${font.value}`}
                      className="cursor-pointer"
                      style={{ fontFamily: font.family }}
                    >
                      {font.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Body Font</Label>
              <RadioGroup
                value={settings.bodyFont}
                onValueChange={(value) => updateSettings({ bodyFont: value })}
              >
                {BODY_FONTS.map((font) => (
                  <div key={font.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={font.value} id={`body-${font.value}`} />
                    <Label
                      htmlFor={`body-${font.value}`}
                      className="cursor-pointer"
                      style={{ fontFamily: font.family }}
                    >
                      {font.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Button Style Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Circle className="h-4 w-4" />
              Button Style
            </CardTitle>
            <CardDescription>Choose the button corner style</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.buttonStyle}
              onValueChange={(value: 'rounded' | 'pill') => updateSettings({ buttonStyle: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rounded" id="rounded" />
                  <Label htmlFor="rounded" className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span>Rounded</span>
                      <Button variant="default" size="sm" className="rounded-md pointer-events-none">
                        Example
                      </Button>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pill" id="pill" />
                  <Label htmlFor="pill" className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span>Pill</span>
                      <Button variant="default" size="sm" className="rounded-full pointer-events-none">
                        Example
                      </Button>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Color Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Colors</CardTitle>
            <CardDescription>Customize the color scheme</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="background">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="background">BG</TabsTrigger>
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>

              <TabsContent value="background" className="space-y-3">
                <Label>Background Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {BACKGROUND_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings({ backgroundColor: color.value })}
                      className={`h-10 rounded-md border-2 transition-all ${
                        settings.backgroundColor === color.value
                          ? 'border-black scale-95'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="pt-2 space-y-2">
                  <Label className="text-xs">Custom HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="#FFFFFF"
                      value={customBgColor}
                      onChange={(e) => setCustomBgColor(e.target.value)}
                      maxLength={7}
                    />
                    <Button
                      size="sm"
                      onClick={() => applyCustomColor('background', customBgColor)}
                      disabled={!customBgColor.match(/^#[0-9A-Fa-f]{6}$/)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="buttons" className="space-y-3">
                <Label>Button Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {BUTTON_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings({ buttonColor: color.value })}
                      className={`h-10 rounded-md border-2 transition-all ${
                        settings.buttonColor === color.value
                          ? 'border-black scale-95'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="pt-2 space-y-2">
                  <Label className="text-xs">Custom HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="#3B82F6"
                      value={customButtonColor}
                      onChange={(e) => setCustomButtonColor(e.target.value)}
                      maxLength={7}
                    />
                    <Button
                      size="sm"
                      onClick={() => applyCustomColor('button', customButtonColor)}
                      disabled={!customButtonColor.match(/^#[0-9A-Fa-f]{6}$/)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-3">
                <Label>Header Text Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {TEXT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings({ headerTextColor: color.value })}
                      className={`h-10 rounded-md border-2 transition-all ${
                        settings.headerTextColor === color.value
                          ? 'border-black scale-95'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="pt-2 space-y-2">
                  <Label className="text-xs">Custom HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={customTextColor}
                      onChange={(e) => setCustomTextColor(e.target.value)}
                      maxLength={7}
                    />
                    <Button
                      size="sm"
                      onClick={() => applyCustomColor('text', customTextColor)}
                      disabled={!customTextColor.match(/^#[0-9A-Fa-f]{6}$/)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            const defaultSettings: CustomizationSettings = {
              headerFont: 'sans',
              bodyFont: 'sans',
              buttonStyle: 'rounded',
              backgroundColor: '#F9FAFB',
              buttonColor: '#3B82F6',
              headerTextColor: '#000000',
            };
            setSettings(defaultSettings);
            onSettingsChange(defaultSettings);
          }}
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
