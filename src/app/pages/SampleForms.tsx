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
import { FormsflowBranding } from '../components/FormsflowBranding';

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

  return (
    <CustomizationProvider value={settings}>
      <div className="flex h-screen overflow-hidden">
        <div
          className="flex-1 overflow-y-scroll p-6"
          style={{
            backgroundColor: settings.backgroundColor,
            fontFamily: BODY_FONTS[settings.bodyFont]?.family,
            fontWeight: BODY_FONTS[settings.bodyFont]?.weight,
            '--body-font-weight': BODY_FONTS[settings.bodyFont]?.weight ?? 500,
          } as React.CSSProperties & Record<string, unknown>}
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
                variant={showCustomization ? 'default' : 'outline'}
                onClick={() => setShowCustomization(!showCustomization)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>

            {/* Form container — white card over the background colour */}
            <div className="bg-white rounded-[5px] p-10 space-y-6">
              {/* Form Header */}
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-medium" style={{
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
            </div>

            {/* Branding */}
            <FormsflowBranding />
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
