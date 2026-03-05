import { useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Paintbrush, Type, X } from 'lucide-react';

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
  accentColor: string;
}

/**
 * Darkens a hex colour by multiplying each RGB channel by the given factor.
 * Factor 0.9 = 10% darker (used for button hover per spec).
 */
export function darkenColor(hex: string, factor: number): string {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Returns white or black text color based on WCAG relative luminance of the background.
 */
export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return luminance > 0.179 ? '#000000' : '#FFFFFF';
}

const HEADER_FONTS = [
  { value: 'sans', label: 'Sans', family: 'Figtree, sans-serif' },
  { value: 'heavy-sans', label: 'Heavy Sans', family: 'Figtree, sans-serif', weight: 600 },
  { value: 'serif', label: 'Serif', family: "'Libre Baskerville', serif" },
  { value: 'mono', label: 'Mono', family: "'DM Mono', monospace" },
  { value: 'slab', label: 'Slab', family: "'Roboto Slab', serif" },
];

const BODY_FONTS = [
  { value: 'sans', label: 'Sans', family: 'Figtree, sans-serif' },
  { value: 'heavy-sans', label: 'Heavy Sans', family: 'Figtree, sans-serif', weight: 600 },
  { value: 'serif', label: 'Serif', family: "'Libre Baskerville', serif" },
  { value: 'mono', label: 'Mono', family: "'DM Mono', monospace" },
  { value: 'slab', label: 'Slab', family: "'Roboto Slab', serif" },
];

const BACKGROUND_COLORS = [
  // Row 1: Neutrals
  { name: 'Near White', value: '#FCFCFC' },
  { name: 'Light Gray', value: '#F7F7F7' },
  { name: 'Cool Gray', value: '#F4F7FA' },
  { name: 'Ice Blue', value: '#E8F1F8' },
  { name: 'Pale Teal', value: '#E7F2F2' },
  { name: 'Pale Green', value: '#EAF4EC' },
  // Row 2: Tints
  { name: 'Silver', value: '#EFEFEF' },
  { name: 'Blush', value: '#FBEBEC' },
  { name: 'Rose', value: '#F3E9EC' },
  { name: 'Lavender', value: '#F0ECFC' },
  { name: 'Wisteria', value: '#EFECF5' },
  { name: 'Peach', value: '#FCEEE8' },
  // Row 3: Warm & dark
  { name: 'Cream', value: '#F6F1E6' },
  { name: 'Navy', value: '#011B47' },
  { name: 'Forest', value: '#052B00' },
  { name: 'Oxblood', value: '#240001' },
  { name: 'Chocolate', value: '#392000' },
  { name: 'Black', value: '#000000' },
];

const ACCENT_COLORS = [
  // Row 1: Neutrals & warm
  { name: 'Black', value: '#000000' },
  { name: 'Warm Gray', value: '#4A4540' },
  { name: 'Slate', value: '#4A5568' },
  { name: 'Dark Gold', value: '#A8750A' },
  { name: 'Amber', value: '#CE711C' },
  { name: 'Burnt Orange', value: '#E0591C' },
  // Row 2: Red & purple
  { name: 'Red', value: '#D53441' },
  { name: 'Brick', value: '#B03A2E' },
  { name: 'Burgundy', value: '#8B2040' },
  { name: 'Violet', value: '#6C3EE5' },
  { name: 'Purple', value: '#5B3FA0' },
  { name: 'Deep Purple', value: '#4A3080' },
  // Row 3: Blue, teal & green
  { name: 'Blue', value: '#1E78BD' },
  { name: 'Cobalt', value: '#0060AA' },
  { name: 'Teal', value: '#0F7B82' },
  { name: 'Dark Teal', value: '#0A6570' },
  { name: 'Green', value: '#2E9446' },
  { name: 'Forest', value: '#1E6B3C' },
];

const BUTTON_COLORS = ACCENT_COLORS;

export function CustomizationPanel({ onClose, onSettingsChange, currentSettings }: CustomizationPanelProps) {
  const [settings, setSettings] = useState<CustomizationSettings>(currentSettings);
  const [customBgColor, setCustomBgColor] = useState('');
  const [customButtonColor, setCustomButtonColor] = useState('');
  const [customAccentColor, setCustomAccentColor] = useState('');

  const updateSettings = (updates: Partial<CustomizationSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const normalizeHexInput = (value: string): string => {
    if (value === '' || value === '#') return '';
    return value.startsWith('#') ? value : `#${value}`;
  };

  const applyCustomColor = (type: 'background' | 'button' | 'accent', rawColor: string) => {
    const color = rawColor.startsWith('#') ? rawColor : `#${rawColor}`;
    if (type === 'background') {
      updateSettings({ backgroundColor: color });
    } else if (type === 'button') {
      updateSettings({ buttonColor: color });
    } else {
      updateSettings({ accentColor: color });
    }
  };

  return (
    <div className="w-80 border-l bg-white h-full overflow-y-scroll">
      <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Customize</h2>
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
                      style={{ fontFamily: font.family, fontWeight: font.weight }}
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
                      style={{ fontFamily: font.family, fontWeight: font.weight }}
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
            <CardTitle className="text-base">
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
                    <Button variant="default" size="sm" className="rounded-md pointer-events-none">
                      Square
                    </Button>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pill" id="pill" />
                  <Label htmlFor="pill" className="cursor-pointer flex-1">
                    <Button variant="default" size="sm" className="rounded-full pointer-events-none">
                      Rounded
                    </Button>
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
            <CardDescription>Customize the colour scheme</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="background">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="background">Fill</TabsTrigger>
                <TabsTrigger value="accent">Accent</TabsTrigger>
                <TabsTrigger value="button">Button</TabsTrigger>
              </TabsList>

              <TabsContent value="background" className="space-y-3">
                <Label>Background Color</Label>
                <p className="text-xs text-gray-600">Sets the form container background fill.</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {BACKGROUND_COLORS.map((color) => {
                    const isLight = getContrastColor(color.value) === '#000000';
                    return (
                      <button
                        key={color.value}
                        onClick={() => updateSettings({ backgroundColor: color.value })}
                        className={`aspect-square rounded-[5px] border transition-all ${
                          settings.backgroundColor === color.value
                            ? 'border-black ring-2 ring-black ring-offset-1 scale-95'
                            : isLight
                              ? 'border-[#e5e5e5] hover:border-gray-400'
                              : 'border-transparent hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    );
                  })}
                </div>
                <form className="pt-2 space-y-2" onSubmit={(e) => { e.preventDefault(); if (customBgColor.match(/^#?[0-9A-Fa-f]{6}$/)) applyCustomColor('background', customBgColor); }}>
                  <Label className="text-xs">Custom HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="#FFFFFF"
                      value={customBgColor}
                      onChange={(e) => setCustomBgColor(normalizeHexInput(e.target.value))}
                      maxLength={7}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCustomBgColor('')}
                      disabled={!customBgColor}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="accent" className="space-y-3">
                <Label>Accent Color</Label>
                <p className="text-xs text-gray-600">Controls panel heading bars and content accents. Text colour is auto-calculated for legibility.</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings({ accentColor: color.value })}
                      className={`aspect-square rounded-[5px] border transition-all ${
                        settings.accentColor === color.value
                          ? 'border-black ring-2 ring-black ring-offset-1 scale-95'
                          : 'border-transparent hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <form className="pt-2 space-y-2" onSubmit={(e) => { e.preventDefault(); if (customAccentColor.match(/^#?[0-9A-Fa-f]{6}$/)) applyCustomColor('accent', customAccentColor); }}>
                  <Label className="text-xs">Custom HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="#4A4A4A"
                      value={customAccentColor}
                      onChange={(e) => setCustomAccentColor(normalizeHexInput(e.target.value))}
                      maxLength={7}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCustomAccentColor('')}
                      disabled={!customAccentColor}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="button" className="space-y-3">
                <Label>Button Color</Label>
                <p className="text-xs text-gray-600">Controls buttons, checkboxes and radio indicators. Text colour is auto-calculated for legibility.</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {BUTTON_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings({ buttonColor: color.value })}
                      className={`aspect-square rounded-[5px] border transition-all ${
                        settings.buttonColor === color.value
                          ? 'border-black ring-2 ring-black ring-offset-1 scale-95'
                          : 'border-transparent hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <form className="pt-2 space-y-2" onSubmit={(e) => { e.preventDefault(); if (customButtonColor.match(/^#?[0-9A-Fa-f]{6}$/)) applyCustomColor('button', customButtonColor); }}>
                  <Label className="text-xs">Custom HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={customButtonColor}
                      onChange={(e) => setCustomButtonColor(normalizeHexInput(e.target.value))}
                      maxLength={7}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCustomButtonColor('')}
                      disabled={!customButtonColor}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
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
              backgroundColor: '#FFFFFF',
              buttonColor: '#000000',
              accentColor: '#D9D9D9',
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
