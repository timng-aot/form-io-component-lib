import { TextField } from "../formio/TextField";
import { EmailField } from "../formio/EmailField";
import { SelectField } from "../formio/SelectField";
import { TextAreaComponent } from "../formio/TextArea";
import { ColumnsField } from "../formio/ColumnsField";
import { ButtonField } from "../formio/ButtonField";

export function LeadCapture() {
  return (
    <div className="space-y-6">
      <ColumnsField columns={2}>
        <>
          <TextField label="First Name" placeholder="First name" required />
          <TextField label="Last Name" placeholder="Last name" required />
        </>
      </ColumnsField>
      <EmailField label="Work Email" placeholder="you@company.com" required />
      <TextField label="Company Name" placeholder="Company name" required />
      <TextField label="Job Title" placeholder="Job title" />
      <SelectField
        label="How Did You Hear About Us?"
        placeholder="Select an option"
        required
        options={[
          { value: "search", label: "Search" },
          { value: "social_media", label: "Social Media" },
          { value: "referral", label: "Referral" },
          { value: "event", label: "Event" },
          { value: "other", label: "Other" },
        ]}
      />
      <TextAreaComponent
        label="Message"
        placeholder="Tell us how we can help"
        rows={3}
      />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
