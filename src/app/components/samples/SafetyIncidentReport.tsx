import { TextField } from '../formio/TextField';
import { DateTimeField } from '../formio/DateTimeField';
import { SelectField } from '../formio/SelectField';
import { TextAreaComponent } from '../formio/TextArea';
import { WizardField } from '../formio/WizardField';

export function SafetyIncidentReport() {
  return (
    <WizardField
      pages={[
        {
          title: 'Incident Details',
          children: (
            <div className="space-y-4">
              <TextField label="Reporter Name" placeholder="Enter your name (optional)" />
              <DateTimeField label="Date and Time of Incident" required />
              <TextField label="Location" placeholder="Where did the incident occur?" required />
              <SelectField
                label="Type of Incident"
                placeholder="Select incident type"
                required
                options={[
                  { value: 'slip-trip-fall', label: 'Slip / Trip / Fall' },
                  { value: 'equipment', label: 'Equipment Malfunction' },
                  { value: 'chemical', label: 'Chemical Exposure' },
                  { value: 'fire-electrical', label: 'Fire / Electrical' },
                  { value: 'ergonomic', label: 'Ergonomic' },
                  { value: 'vehicle', label: 'Vehicle' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>
          ),
        },
        {
          title: 'Incident Description',
          children: (
            <div className="space-y-4">
              <TextAreaComponent label="Description" placeholder="Describe what happened in detail" rows={4} />
              <TextField label="Witnesses" placeholder="Names of any witnesses" />
              <TextAreaComponent label="Immediate Actions Taken" placeholder="Describe any steps already taken" rows={3} />
            </div>
          ),
        },
      ]}
    />
  );
}
