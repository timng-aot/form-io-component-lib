import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { TextField } from '../components/formio/TextField';
import { PhoneField } from '../components/formio/PhoneField';
import { SelectField } from '../components/formio/SelectField';
import { DateTimeField } from '../components/formio/DateTimeField';
import { PanelField } from '../components/formio/PanelField';
import { ColumnsField } from '../components/formio/ColumnsField';
import { ButtonField } from '../components/formio/ButtonField';
import { CustomizationPanel, CustomizationSettings } from '../components/CustomizationPanel';
import { CustomizationProvider } from '../components/CustomizationContext';
import { Settings, ArrowLeft } from 'lucide-react';
import { getContrastColor } from '../components/CustomizationPanel';

const HEADER_FONTS: Record<string, { family: string; weight?: number }> = {
  'sans': { family: 'Figtree, sans-serif' },
  'heavy-sans': { family: 'Figtree, sans-serif', weight: 600 },
  'serif': { family: "'Libre Baskerville', serif" },
  'mono': { family: "'DM Mono', monospace" },
  'slab': { family: "'Roboto Slab', serif" },
};

const BODY_FONTS: Record<string, { family: string; weight?: number }> = {
  'sans': { family: 'Figtree, sans-serif' },
  'heavy-sans': { family: 'Figtree, sans-serif', weight: 600 },
  'serif': { family: "'Libre Baskerville', serif" },
  'mono': { family: "'DM Mono', monospace" },
  'slab': { family: "'Roboto Slab', serif" },
};

export default function SampleForms() {
  const [showCustomization, setShowCustomization] = useState(false);
  const [settings, setSettings] = useState<CustomizationSettings>({
    headerFont: 'sans',
    bodyFont: 'sans',
    buttonStyle: 'rounded',
    backgroundColor: '#FFFFFF',
    buttonColor: '#000000',
    accentColor: '#4A4A4A',
  });
  const [date, setDate] = useState<Date>();

  const customizeBtnTextColor = getContrastColor(settings.buttonColor);

  return (
    <CustomizationProvider value={settings}>
      <div className="flex h-screen overflow-hidden">
        <div
          className="flex-1 overflow-y-scroll p-6"
          style={{
            backgroundColor: settings.backgroundColor,
            fontFamily: BODY_FONTS[settings.bodyFont]?.family,
            fontWeight: BODY_FONTS[settings.bodyFont]?.weight,
          }}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Components
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setShowCustomization(!showCustomization)}
                style={{
                  backgroundColor: showCustomization ? settings.buttonColor : 'white',
                  color: showCustomization ? customizeBtnTextColor : settings.buttonColor,
                  borderColor: settings.buttonColor,
                  borderRadius: settings.buttonStyle === 'pill' ? '9999px' : '0.3125rem',
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>

            {/* Form Header */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-medium" style={{
                color: settings.accentColor,
                fontFamily: HEADER_FONTS[settings.headerFont]?.family,
                fontWeight: HEADER_FONTS[settings.headerFont]?.weight,
              }}>
                Patient Intake Form
              </h1>
              <p className="text-gray-600">Healthcare Form</p>
            </div>

            {/* Section 1 */}
            <PanelField title="Section 1: Applicant Information">
              <div className="space-y-4">
                <ColumnsField columns={3}>
                  <>
                    <TextField label="First Name" required />
                    <TextField label="Middle Name" />
                    <TextField label="Last Name" required />
                  </>
                </ColumnsField>

                <ColumnsField columns={2}>
                  <>
                    <TextField label="Social Insurance Number (SIN)" placeholder="___-___-___" required />
                    <DateTimeField label="Date of Birth" required value={date} onChange={setDate} />
                  </>
                </ColumnsField>

                <TextField label="Mailing Address (Street, Apt)" placeholder="e.g., 123 Maple Street, Apt 4B" required />

                <ColumnsField columns={3}>
                  <>
                    <TextField label="City" required />
                    <TextField label="Province" required />
                    <TextField label="Postal Code" placeholder="__ ___" required />
                  </>
                </ColumnsField>

                <ColumnsField columns={2}>
                  <>
                    <PhoneField label="Primary Phone Number" placeholder="(___) ___-____" required />
                    <SelectField
                      label="Marital Status"
                      required
                      options={[
                        { value: 'single', label: 'Single' },
                        { value: 'married', label: 'Married' },
                        { value: 'common-law', label: 'Common-law' },
                        { value: 'separated', label: 'Separated' },
                        { value: 'divorced', label: 'Divorced' },
                        { value: 'widowed', label: 'Widowed' },
                      ]}
                    />
                  </>
                </ColumnsField>
              </div>
            </PanelField>

            {/* Section 2 */}
            <PanelField title="Section 2: Spouse or Common-law Partner's Information">
              <div className="space-y-4">
                <ColumnsField columns={3}>
                  <>
                    <TextField label="First Name" required />
                    <TextField label="Middle Name" />
                    <TextField label="Last Name" required />
                  </>
                </ColumnsField>

                <ColumnsField columns={2}>
                  <>
                    <TextField label="Social Insurance Number (SIN)" placeholder="___-___-___" required />
                    <DateTimeField label="Date of Birth" required value={date} onChange={setDate} />
                  </>
                </ColumnsField>

                <TextField label="Mailing Address (Street, Apt)" placeholder="e.g., 123 Maple Street, Apt 4B" required />

                <ColumnsField columns={3}>
                  <>
                    <TextField label="City" required />
                    <TextField label="Province" required />
                    <TextField label="Postal Code" placeholder="__ ___" required />
                  </>
                </ColumnsField>

                <PhoneField label="Primary Phone Number" placeholder="(___) ___-____" required />
              </div>
            </PanelField>

            {/* Submit */}
            <div className="flex justify-center pb-6">
              <ButtonField label="Submit" />
            </div>

            {/* Branding */}
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">
                Created by <span className="font-medium text-gray-500">formsflow.ai</span>
              </p>
            </div>
          </div>
        </div>

        {showCustomization && (
          <CustomizationPanel
            currentSettings={settings}
            onSettingsChange={setSettings}
          />
        )}
      </div>
    </CustomizationProvider>
  );
}
