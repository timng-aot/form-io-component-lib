import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { SelectField } from '../components/formio/SelectField';
import { CustomizationPanel, CustomizationSettings } from '../components/CustomizationPanel';
import { CustomizationProvider } from '../components/CustomizationContext';
import { Settings, ArrowLeft } from 'lucide-react';
import { FormsflowBranding } from '../components/FormsflowBranding';

// Sample forms
import { PatientIntakeForm } from '../components/samples/PatientIntakeForm';
import { ITSupportRequest } from '../components/samples/ITSupportRequest';
import { SecurityIncidentReport } from '../components/samples/SecurityIncidentReport';
import { JobApplication } from '../components/samples/JobApplication';
import { ExitInterview } from '../components/samples/ExitInterview';
import { TeamStandUp } from '../components/samples/TeamStandUp';
import { SafetyIncidentReport } from '../components/samples/SafetyIncidentReport';
import { ExpenseReimbursement } from '../components/samples/ExpenseReimbursement';
import { TravelPreApproval } from '../components/samples/TravelPreApproval';
import { LeadCapture } from '../components/samples/LeadCapture';
import { EventRegistration } from '../components/samples/EventRegistration';
import { ContractReviewRequest } from '../components/samples/ContractReviewRequest';
import { ComplianceConcern } from '../components/samples/ComplianceConcern';
import { ContactForm } from '../components/samples/ContactForm';
import { RoomBooking } from '../components/samples/RoomBooking';

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

interface FormEntry {
  value: string;
  label: string;
  title: string;
  subtitle: string;
  component: React.ComponentType;
}

const SAMPLE_FORMS: FormEntry[] = [
  // Healthcare
  { value: 'patient-intake', label: 'Patient Intake Form', title: 'Patient Intake Form', subtitle: 'Healthcare', component: PatientIntakeForm },
  // IT
  { value: 'it-support', label: 'IT Support Request', title: 'IT Support Request', subtitle: 'Information Technology', component: ITSupportRequest },
  { value: 'security-incident', label: 'Security Incident Report', title: 'Security Incident Report', subtitle: 'Information Technology', component: SecurityIncidentReport },
  // HR
  { value: 'job-application', label: 'Job Application', title: 'Job Application', subtitle: 'Human Resources', component: JobApplication },
  { value: 'exit-interview', label: 'Exit Interview', title: 'Exit Interview', subtitle: 'Human Resources', component: ExitInterview },
  // Operations
  { value: 'team-standup', label: 'Daily Stand-Up', title: 'Daily Stand-Up', subtitle: 'Operations', component: TeamStandUp },
  { value: 'safety-incident', label: 'Safety Incident Report', title: 'Workplace Safety Incident Report', subtitle: 'Operations', component: SafetyIncidentReport },
  // Finance
  { value: 'expense-reimbursement', label: 'Expense Reimbursement', title: 'Expense Reimbursement', subtitle: 'Finance', component: ExpenseReimbursement },
  { value: 'travel-pre-approval', label: 'Travel Pre-Approval', title: 'Travel Pre-Approval', subtitle: 'Finance', component: TravelPreApproval },
  // Sales & Marketing
  { value: 'lead-capture', label: 'Lead Capture', title: 'Lead Capture', subtitle: 'Sales & Marketing', component: LeadCapture },
  { value: 'event-registration', label: 'Event Registration', title: 'Event Registration', subtitle: 'Sales & Marketing', component: EventRegistration },
  // Legal
  { value: 'contract-review', label: 'Contract Review Request', title: 'Contract Review Request', subtitle: 'Legal', component: ContractReviewRequest },
  { value: 'compliance-concern', label: 'Compliance Concern Report', title: 'Compliance Concern Report', subtitle: 'Legal', component: ComplianceConcern },
  // Other
  { value: 'contact-form', label: 'Contact Form', title: 'Contact Form', subtitle: 'General', component: ContactForm },
  { value: 'room-booking', label: 'Room Booking', title: 'Room Booking', subtitle: 'General', component: RoomBooking },
];

export default function SampleForms() {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedForm, setSelectedForm] = useState('patient-intake');
  const [settings, setSettings] = useState<CustomizationSettings>({
    headerFont: 'sans',
    bodyFont: 'sans',
    buttonStyle: 'rounded',
    backgroundColor: '#FFFFFF',
    buttonColor: '#000000',
    accentColor: '#D9D9D9',
  });

  const currentForm = SAMPLE_FORMS.find((f) => f.value === selectedForm) ?? SAMPLE_FORMS[0];
  const FormComponent = currentForm.component;

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
            {/* Navigation + Form Selector */}
            <div className="bg-white rounded-[5px] p-4 space-y-4" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 400 }}>
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
              <SelectField
                label="Sample Form"
                description="Choose a form to preview with the current customization settings"
                options={SAMPLE_FORMS.map((f) => ({ value: f.value, label: f.label }))}
                value={selectedForm}
                onChange={setSelectedForm}
              />
            </div>

            {/* Form container */}
            <div className="bg-white rounded-[5px] p-10 space-y-6">
              {/* Form Header */}
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-medium" style={{
                  fontFamily: HEADER_FONTS[settings.headerFont]?.family,
                  fontWeight: HEADER_FONTS[settings.headerFont]?.weight,
                }}>
                  {currentForm.title}
                </h1>
                <p style={{ color: '#4A4A4A' }}>{currentForm.subtitle}</p>
              </div>

              {/* Form Body */}
              <FormComponent />
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
