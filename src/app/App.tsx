import { useState } from 'react';
import { Link } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { ScrollArea } from './components/ui/scroll-area';
import { Button } from './components/ui/button';
import { Settings, FileText } from 'lucide-react';

// Basic Components
import { TextField } from './components/formio/TextField';
import { TextAreaComponent } from './components/formio/TextArea';
import { NumberField } from './components/formio/NumberField';
import { PasswordField } from './components/formio/PasswordField';
import { CheckboxField } from './components/formio/CheckboxField';
import { SelectField } from './components/formio/SelectField';
import { RadioField } from './components/formio/RadioField';
import { ButtonField } from './components/formio/ButtonField';

// Advanced Components
import { EmailField } from './components/formio/EmailField';
import { PhoneField } from './components/formio/PhoneField';
import { DateTimeField } from './components/formio/DateTimeField';
import { CurrencyField } from './components/formio/CurrencyField';
import { URLField } from './components/formio/URLField';
import { TagsField } from './components/formio/TagsField';
import { SignatureField } from './components/formio/SignatureField';
import { SurveyField } from './components/formio/SurveyField';
import { TimeField } from './components/formio/TimeField';
import { AddressField } from './components/formio/AddressField';
import { DayField } from './components/formio/DayField';

// Layout Components
import { PanelField } from './components/formio/PanelField';
import { ColumnsField } from './components/formio/ColumnsField';
import { FieldSetField } from './components/formio/FieldSetField';
import { TabsField } from './components/formio/TabsField';

// Data Components
import { HiddenField } from './components/formio/HiddenField';
import { ContentField } from './components/formio/ContentField';
import { DataGridField } from './components/formio/DataGridField';
import { FileField } from './components/formio/FileField';
import { Input } from './components/ui/input';

// Customization
import { CustomizationPanel, CustomizationSettings } from './components/CustomizationPanel';
import { CustomizationProvider } from './components/CustomizationContext';
import { FormsflowBranding } from './components/FormsflowBranding';

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

export default function App() {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [tags, setTags] = useState<string[]>(['React', 'Form.io']);
  const [selectedOption, setSelectedOption] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [date, setDate] = useState<Date>();
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [gridData, setGridData] = useState([
    { name: 'John Doe', email: 'john@example.com', age: '30' }
  ]);
  const [showCustomization, setShowCustomization] = useState(false);
  const [settings, setSettings] = useState<CustomizationSettings>({
    headerFont: 'sans',
    bodyFont: 'sans',
    buttonStyle: 'rounded',
    backgroundColor: '#FFFFFF',
    buttonColor: '#000000',
    accentColor: '#4A4A4A',
  });

  const handleSettingsChange = (newSettings: CustomizationSettings) => {
    setSettings(newSettings);
  };

  return (
    <CustomizationProvider value={settings}>
      <div className="flex h-screen overflow-hidden">
        {/* Main Content */}
        <div
          className="flex-1 overflow-y-scroll p-6"
          style={{
            backgroundColor: settings.backgroundColor,
            fontFamily: BODY_FONTS[settings.bodyFont]?.family,
            fontWeight: BODY_FONTS[settings.bodyFont]?.weight,
            '--body-font-weight': BODY_FONTS[settings.bodyFont]?.weight ?? 500,
          } as React.CSSProperties & Record<string, unknown>}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1
                className="text-4xl"
                style={{
                  fontFamily: HEADER_FONTS[settings.headerFont]?.family,
                  fontWeight: HEADER_FONTS[settings.headerFont]?.weight,
                }}
              >
                formsflow Form.io Component Library
              </h1>
              <p className="text-gray-600">
                A comprehensive collection of all Form.io components built with React and Tailwind CSS
              </p>
            </div>

            {/* Customize Button */}
            <div className="flex justify-center gap-2">
              <Link to="/samples">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Sample Forms
                </Button>
              </Link>
              <Button
                variant={showCustomization ? 'default' : 'outline'}
                onClick={() => setShowCustomization(!showCustomization)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {showCustomization ? 'Hide' : 'Show'} Customization
              </Button>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>

              {/* Basic Components Tab */}
              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Components</CardTitle>
                    <CardDescription>
                      Fundamental form elements for building forms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg mb-3">Text Field</h3>
                          <TextField
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                            description="Your first and last name"
                            value={textValue}
                            onChange={setTextValue}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Text Area</h3>
                          <TextAreaComponent
                            label="Comments"
                            placeholder="Enter your comments"
                            description="Share your thoughts with us"
                            rows={4}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Number Field</h3>
                          <NumberField
                            label="Age"
                            placeholder="Enter your age"
                            required
                            description="Must be 18 or older"
                            min={18}
                            max={100}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Password Field</h3>
                          <PasswordField
                            label="Password"
                            placeholder="Enter your password"
                            required
                            description="Must be at least 8 characters"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Checkbox</h3>
                          <CheckboxField
                            label="I agree to the terms and conditions"
                            description="Please read our terms before agreeing"
                            checked={checkboxChecked}
                            onChange={setCheckboxChecked}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Select Box</h3>
                          <SelectField
                            label="Country"
                            placeholder="Select your country"
                            required
                            description="Choose your country of residence"
                            options={[
                              { value: 'us', label: 'United States' },
                              { value: 'uk', label: 'United Kingdom' },
                              { value: 'ca', label: 'Canada' },
                              { value: 'au', label: 'Australia' }
                            ]}
                            value={selectedOption}
                            onChange={setSelectedOption}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Radio Buttons</h3>
                          <RadioField
                            label="Preferred Contact Method"
                            required
                            description="How would you like us to contact you?"
                            options={[
                              { value: 'email', label: 'Email' },
                              { value: 'phone', label: 'Phone' },
                              { value: 'sms', label: 'SMS' }
                            ]}
                            value={radioValue}
                            onChange={setRadioValue}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Button</h3>
                          <ButtonField
                            label="Submit Form"
                            variant="default"
                            onClick={() => alert('Form submitted!')}
                          />
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Components Tab */}
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Components</CardTitle>
                    <CardDescription>
                      Specialized form components with advanced functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg mb-3">Email Field</h3>
                          <EmailField
                            label="Email Address"
                            placeholder="example@email.com"
                            required
                            description="We'll never share your email"
                            value={emailValue}
                            onChange={setEmailValue}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Phone Number</h3>
                          <PhoneField
                            label="Phone Number"
                            placeholder="(555) 555-5555"
                            required
                            description="Include area code"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Date/Time</h3>
                          <DateTimeField
                            label="Date of Birth"
                            required
                            description="Select your date of birth"
                            value={date}
                            onChange={setDate}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Day</h3>
                          <DayField
                            label="Day"
                            description="Enter month, day, and year"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Time</h3>
                          <TimeField
                            label="Preferred Time"
                            required
                            description="Select your preferred appointment time"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Currency</h3>
                          <CurrencyField
                            label="Budget"
                            placeholder="0.00"
                            required
                            description="Enter your budget amount"
                            currency="$"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">URL</h3>
                          <URLField
                            label="Website"
                            placeholder="https://example.com"
                            description="Enter your website URL"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Tags</h3>
                          <TagsField
                            label="Skills"
                            placeholder="Type and press Enter"
                            required
                            description="Add your technical skills"
                            value={tags}
                            onChange={setTags}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Address</h3>
                          <AddressField
                            label="Mailing Address"
                            required
                            description="Enter your complete mailing address"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Signature</h3>
                          <SignatureField
                            label="Digital Signature"
                            required

                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Survey</h3>
                          <SurveyField
                            label="Customer Satisfaction Survey"
                            required
                            description="Please rate the following aspects"
                            questions={[
                              'How satisfied are you with our service?',
                              'Would you recommend us to others?',
                              'How easy was it to use our platform?'
                            ]}
                            options={['Poor', 'Fair', 'Good', 'Excellent']}
                            value={surveyAnswers}
                            onChange={setSurveyAnswers}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">File Upload</h3>
                          <FileField
                            label="Upload Documents"
                            required
                            description="Upload PDF or Word documents"
                            accept=".pdf,.doc,.docx"
                            multiple
                          />
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layout Components Tab */}
              <TabsContent value="layout" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Layout Components</CardTitle>
                    <CardDescription>
                      Organize and structure your forms with layout components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg mb-3">Panel</h3>
                          <PanelField
                            title="Personal Information"
                            description="Please provide your personal details"
                          >
                            <div className="space-y-4">
                              <TextField label="First Name" placeholder="John" />
                              <TextField label="Last Name" placeholder="Doe" />
                              <EmailField label="Email" placeholder="john@example.com" />
                            </div>
                          </PanelField>
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Columns</h3>
                          <ColumnsField columns={2}>
                            <>
                              <TextField label="First Name" placeholder="John" />
                              <TextField label="Last Name" placeholder="Doe" />
                            </>
                          </ColumnsField>
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Fieldset</h3>
                          <FieldSetField legend="Contact Information">
                            <EmailField label="Email" placeholder="email@example.com" />
                            <PhoneField label="Phone" placeholder="(555) 555-5555" />
                          </FieldSetField>
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Tabs</h3>
                          <TabsField
                            tabs={[
                              {
                                label: 'Personal',
                                content: (
                                  <div className="space-y-4">
                                    <TextField label="Name" placeholder="Enter name" />
                                    <EmailField label="Email" placeholder="Enter email" />
                                  </div>
                                )
                              },
                              {
                                label: 'Work',
                                content: (
                                  <div className="space-y-4">
                                    <TextField label="Company" placeholder="Enter company" />
                                    <TextField label="Position" placeholder="Enter position" />
                                  </div>
                                )
                              }
                            ]}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">HTML Content</h3>
                          <ContentField
                            html="<h4>Terms and Conditions</h4><p>Please read these terms carefully before proceeding. By submitting this form, you agree to our <strong>privacy policy</strong> and <strong>terms of service</strong>.</p>"
                          />
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Components Tab */}
              <TabsContent value="data" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Components</CardTitle>
                    <CardDescription>
                      Components for managing complex data structures
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg mb-3">Hidden Field</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Hidden fields store data without displaying it to users
                          </p>
                          <div className="border rounded-md p-4 bg-gray-50">
                            <HiddenField value="hidden-value-123" />
                            <p className="text-sm text-gray-600">
                              Hidden field with value: "hidden-value-123"
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Data Grid</h3>
                          <DataGridField
                            label="Team Members"
                            required
                            description="Add team members and their information"
                            columns={[
                              { key: 'name', label: 'Name' },
                              { key: 'email', label: 'Email' },
                              { key: 'age', label: 'Age' }
                            ]}
                            value={gridData}
                            onChange={setGridData}
                            renderCell={(row, column, onChange) => (
                              <Input
                                type={column === 'age' ? 'number' : 'text'}
                                value={row[column] || ''}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={`Enter ${column}`}
                              />
                            )}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Container</h3>
                          <div className="border rounded-md p-4 space-y-4">
                            <p className="text-sm text-gray-600 mb-2">
                              A container groups related form components together
                            </p>
                            <TextField label="Username" placeholder="Enter username" />
                            <PasswordField label="Password" placeholder="Enter password" />
                            <ButtonField label="Login" variant="default" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg mb-3">Edit Grid</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Similar to Data Grid but with inline editing capabilities
                          </p>
                          <div className="border rounded-md p-4 bg-gray-50">
                            <p className="text-sm text-gray-600">
                              The Edit Grid component allows users to add, edit, and remove rows
                              with a more streamlined interface than Data Grid.
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Footer - formsflow branding */}
            <FormsflowBranding />
          </div>
        </div>

        {/* Customization Panel */}
        {showCustomization && (
          <CustomizationPanel
            currentSettings={settings}
            onSettingsChange={handleSettingsChange}
          />
        )}
      </div>
    </CustomizationProvider>
  );
}
