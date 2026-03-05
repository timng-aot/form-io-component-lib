import { TextField } from '../formio/TextField';
import { EmailField } from '../formio/EmailField';
import { SelectField } from '../formio/SelectField';
import { TextAreaComponent } from '../formio/TextArea';
import { FileField } from '../formio/FileField';
import { ButtonField } from '../formio/ButtonField';

export function ITSupportRequest() {
  return (
    <div className="space-y-6">
      <TextField label="Requester Name" placeholder="Enter your full name" required />
      <EmailField label="Email" placeholder="you@company.com" required />
      <TextField label="Department" placeholder="e.g. Engineering, Marketing" />
      <SelectField
        label="Issue Category"
        placeholder="Select a category"
        required
        options={[
          { value: 'hardware', label: 'Hardware' },
          { value: 'software', label: 'Software' },
          { value: 'network', label: 'Network' },
          { value: 'access', label: 'Access' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <TextAreaComponent
        label="Issue Description"
        placeholder="Describe the issue in detail"
        rows={4}
      />
      <SelectField
        label="Urgency Level"
        placeholder="Select urgency"
        required
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical' },
        ]}
      />
      <FileField label="Attachment" description="Attach any relevant screenshots or files" />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
