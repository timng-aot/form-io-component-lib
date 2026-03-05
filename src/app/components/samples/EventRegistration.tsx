import { TextField } from "../formio/TextField";
import { EmailField } from "../formio/EmailField";
import { CheckboxField } from "../formio/CheckboxField";
import { TextAreaComponent } from "../formio/TextArea";
import { PanelField } from "../formio/PanelField";
import { ButtonField } from "../formio/ButtonField";

export function EventRegistration() {
  return (
    <div className="space-y-6">
      <PanelField title="Attendee Information">
        <TextField label="Full Name" placeholder="Full name" required />
        <EmailField label="Email" placeholder="Email address" required />
        <TextField
          label="Company or Organisation"
          placeholder="Company or organisation"
          required
        />
        <TextField
          label="Role or Job Title"
          placeholder="Role or job title"
          required
        />
      </PanelField>
      <PanelField title="Session Selection">
        <CheckboxField label="Keynote" />
        <CheckboxField label="Workshop A" />
        <CheckboxField label="Workshop B" />
        <CheckboxField label="Networking Session" />
      </PanelField>
      <PanelField title="Additional Information">
        <TextAreaComponent
          label="Dietary Restrictions or Accessibility Needs"
          placeholder="Let us know if you have any requirements"
          rows={2}
        />
        <CheckboxField label="I consent to receiving follow-up communications" />
      </PanelField>
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
