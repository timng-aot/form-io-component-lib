import { TextField } from '../formio/TextField';
import { EmailField } from '../formio/EmailField';
import { PhoneField } from '../formio/PhoneField';
import { NumberField } from '../formio/NumberField';
import { TextAreaComponent } from '../formio/TextArea';
import { FileField } from '../formio/FileField';
import { ButtonField } from '../formio/ButtonField';

export function JobApplication() {
  return (
    <div className="space-y-6">
      <TextField label="Full Name" placeholder="Enter your full name" required />
      <EmailField label="Email" placeholder="you@example.com" required />
      <PhoneField label="Phone" placeholder="(555) 555-5555" required />
      <TextField label="Position Applied For" placeholder="e.g. Software Engineer" required />
      <NumberField
        label="Years of Experience"
        placeholder="0"
        min={0}
        max={50}
      />
      <TextAreaComponent
        label="Cover Statement"
        placeholder="Tell us why you're a great fit for this role"
        rows={5}
      />
      <FileField label="CV / Resume" description="Upload your CV or resume" required />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
