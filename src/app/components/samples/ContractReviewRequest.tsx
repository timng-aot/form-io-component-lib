import { TextField } from "../formio/TextField";
import { SelectField } from "../formio/SelectField";
import { TextAreaComponent } from "../formio/TextArea";
import { DateTimeField } from "../formio/DateTimeField";
import { FileField } from "../formio/FileField";
import { ColumnsField } from "../formio/ColumnsField";
import { ButtonField } from "../formio/ButtonField";

export function ContractReviewRequest() {
  return (
    <div className="space-y-6">
      <ColumnsField columns={2}>
        <>
          <TextField label="Requester Name" placeholder="Your name" required />
          <TextField label="Department" placeholder="Department" required />
        </>
      </ColumnsField>
      <SelectField
        label="Contract Type"
        placeholder="Select contract type"
        required
        options={[
          { value: "vendor_agreement", label: "Vendor Agreement" },
          { value: "nda", label: "NDA" },
          { value: "service_agreement", label: "Service Agreement" },
          { value: "employment", label: "Employment" },
          { value: "lease", label: "Lease" },
          { value: "other", label: "Other" },
        ]}
      />
      <TextField
        label="Counterparty Name"
        placeholder="Name of the other party"
        required
      />
      <TextAreaComponent
        label="Summary"
        placeholder="Brief summary of the contract"
        rows={3}
      />
      <DateTimeField label="Review Deadline" required />
      <FileField label="Draft Upload" required />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
