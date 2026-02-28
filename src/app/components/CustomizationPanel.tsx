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
  // Row 1: Neutrals & warm pastels
  { name: 'White', value: '#FFFFFF' },
  { name: 'Light Gray', value: '#F9F9F9' },
  { name: 'Rose Tint', value: '#FEF0F0' },
  { name: 'Pink Tint', value: '#FCF1F7' },
  { name: 'Violet Tint', value: '#F9F4FF' },
  { name: 'Magenta Tint', value: '#FCF3FF' },
  { name: 'Lavender Tint', value: '#F0E6FE' },
  // Row 2: Cool pastels
  { name: 'Indigo Tint', value: '#ECF0FE' },
  { name: 'Blue Tint', value: '#EDF4FF' },
  { name: 'Sky Tint', value: '#EEF8FF' },
  { name: 'Cyan Tint', value: '#EBFDFF' },
  { name: 'Teal Tint', value: '#EFFCF9' },
  { name: 'Mint Tint', value: '#EBFCF4' },
  { name: 'Lime Tint', value: '#F6FDE5' },
  // Row 3: Warm & dark
  { name: 'Amber Tint', value: '#FEF6EB' },
  { name: 'Salmon Tint', value: '#FDF1F0' },
  { name: 'Dark Brown', value: '#242121' },
  { name: 'Near Black', value: '#171717' },
  { name: 'Dark Navy', value: '#060A16' },
  { name: 'Midnight', value: '#1B1B41' },
  { name: 'Dark Teal', value: '#0D2929' },
];

const ACCENT_COLORS = [
  // Row 1: Warm & vibrant
  { name: 'Orange', value: '#F76724' },
  { name: 'Red', value: '#D53441' },
  { name: 'Pink', value: '#E1508D' },
  { name: 'Magenta', value: '#B138C9' },
  { name: 'Purple', value: '#833BE2' },
  { name: 'Violet', value: '#6C3EE5' },
  { name: 'Indigo', value: '#4343DD' },
  // Row 2: Cool & natural
  { name: 'Blue', value: '#245BE3' },
  { name: 'Azure', value: '#1E78BD' },
  { name: 'Cerulean', value: '#2384A7' },
  { name: 'Teal', value: '#26867D' },
  { name: 'Sea Green', value: '#268760' },
  { name: 'Green', value: '#2E9446' },
  { name: 'Olive', value: '#609521' },
  // Row 3: Earth & dark
  { name: 'Brown', value: '#935A17' },
  { name: 'Rust', value: '#CE711C' },
  { name: 'Burnt Orange', value: '#E0591C' },
  { name: 'Dark Maroon', value: '#401118' },
  { name: 'Dark Navy', value: '#060A16' },
  { name: 'Dark Gray', value: '#4A4A4A' },
  { name: 'Black', value: '#000000' },
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

  const applyCustomColor = (type: 'background' | 'button' | 'accent', rawColor: string) => {
    const color = rawColor.startsWith('#') ? rawColor : `#${rawColor}`;
    if (type === 'background') {
      updateSettings({ backgroundColor: color });
      setCustomBgColor('');
    } else if (type === 'button') {
      updateSettings({ buttonColor: color });
      setCustomButtonColor('');
    } else {
      updateSettings({ accentColor: color });
      setCustomAccentColor('');
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
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="accent">Accent</TabsTrigger>
                <TabsTrigger value="button">Button</TabsTrigger>
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
                      disabled={!customBgColor.match(/^#?[0-9A-Fa-f]{6}$/)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accent" className="space-y-3">
                <Label>Accent Color</Label>
                <p className="text-xs text-gray-600">Controls panel heading bars and content accents. Heading text colour is auto-calculated for legibility.</p>
                <div className="grid grid-cols-4 gap-2">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings({ accentColor: color.value })}
                      className={`h-10 rounded-md border-2 transition-all ${
                        settings.accentColor === color.value
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
                      placeholder="#4A4A4A"
                      value={customAccentColor}
                      onChange={(e) => setCustomAccentColor(e.target.value)}
                      maxLength={7}
                    />
                    <Button
                      size="sm"
                      onClick={() => applyCustomColor('accent', customAccentColor)}
                      disabled={!customAccentColor.match(/^#?[0-9A-Fa-f]{6}$/)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="button" className="space-y-3">
                <Label>Button Color</Label>
                <p className="text-xs text-gray-600">Controls buttons, checkboxes and radio indicators. Text colour is auto-calculated for legibility.</p>
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
                      placeholder="#000000"
                      value={customButtonColor}
                      onChange={(e) => setCustomButtonColor(e.target.value)}
                      maxLength={7}
                    />
                    <Button
                      size="sm"
                      onClick={() => applyCustomColor('button', customButtonColor)}
                      disabled={!customButtonColor.match(/^#?[0-9A-Fa-f]{6}$/)}
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
              backgroundColor: '#FFFFFF',
              buttonColor: '#000000',
              accentColor: '#4A4A4A',
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
