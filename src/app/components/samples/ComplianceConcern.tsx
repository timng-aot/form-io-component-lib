import { TextField } from "../formio/TextField";
import { SelectField } from "../formio/SelectField";
import { TextAreaComponent } from "../formio/TextArea";
import { DateTimeField } from "../formio/DateTimeField";
import { FileField } from "../formio/FileField";
import { ButtonField } from "../formio/ButtonField";

export function ComplianceConcern() {
  return (
    <div className="space-y-6">
      <TextField
        label="Reporter Name"
        placeholder="Your name"
        description="Leave blank to submit anonymously"
      />
      <DateTimeField label="Date of Observed Concern" required />
      <SelectField
        label="Category"
        placeholder="Select a category"
        required
        options={[
          { value: "conflict_of_interest", label: "Conflict of Interest" },
          { value: "data_privacy", label: "Data Privacy" },
          { value: "harassment", label: "Harassment" },
          { value: "fraud", label: "Fraud" },
          { value: "safety", label: "Safety" },
          { value: "other", label: "Other" },
        ]}
      />
      <TextAreaComponent
        label="Description"
        placeholder="Describe the concern in detail"
        rows={4}
      />
      <FileField label="Supporting Evidence" description="Upload any relevant files" />
      <SelectField
        label="Preferred Follow-up Method"
        placeholder="Select a method"
        required
        options={[
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "no_follow_up", label: "No Follow-up" },
        ]}
      />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
