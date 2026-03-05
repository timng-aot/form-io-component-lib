import { TextField } from "../formio/TextField";
import { EmailField } from "../formio/EmailField";
import { SelectField } from "../formio/SelectField";
import { TextAreaComponent } from "../formio/TextArea";
import { ButtonField } from "../formio/ButtonField";

export function ContactForm() {
  return (
    <div className="space-y-6">
      <TextField label="Name" placeholder="Your name" required />
      <EmailField label="Email" placeholder="Email address" required />
      <SelectField
        label="Subject"
        placeholder="Select a subject"
        required
        options={[
          { value: "general_enquiry", label: "General Enquiry" },
          { value: "support", label: "Support" },
          { value: "feedback", label: "Feedback" },
          { value: "partnership", label: "Partnership" },
          { value: "other", label: "Other" },
        ]}
      />
      <TextAreaComponent
        label="Message"
        placeholder="Your message"
        rows={4}
      />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
