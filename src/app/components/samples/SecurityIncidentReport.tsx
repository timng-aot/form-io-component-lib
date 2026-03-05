import { TextField } from '../formio/TextField';
import { DateTimeField } from '../formio/DateTimeField';
import { SelectField } from '../formio/SelectField';
import { TextAreaComponent } from '../formio/TextArea';
import { WizardField } from '../formio/WizardField';

export function SecurityIncidentReport() {
  return (
    <WizardField
      pages={[
        {
          title: 'Incident Details',
          children: (
            <div className="space-y-4">
              <TextField label="Reporter Name" placeholder="Enter your name (optional)" />
              <DateTimeField label="Date and Time of Incident" required />
              <SelectField
                label="Incident Type"
                placeholder="Select incident type"
                required
                options={[
                  { value: 'phishing', label: 'Phishing' },
                  { value: 'data-breach', label: 'Data Breach' },
                  { value: 'unauthorized-access', label: 'Unauthorized Access' },
                  { value: 'malware', label: 'Malware' },
                  { value: 'lost-device', label: 'Lost Device' },
                  { value: 'other', label: 'Other' },
                ]}
              />
              <SelectField
                label="Severity Rating"
                placeholder="Select severity"
                required
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' },
                ]}
              />
            </div>
          ),
        },
        {
          title: 'Incident Description',
          children: (
            <div className="space-y-4">
              <TextAreaComponent label="Description" placeholder="Describe what happened" rows={4} />
              <TextAreaComponent label="Systems or Data Affected" placeholder="List affected systems, applications, or data" rows={3} />
              <TextAreaComponent label="Immediate Actions Taken" placeholder="Describe any steps already taken to address the incident" rows={3} />
            </div>
          ),
        },
      ]}
    />
  );
}
