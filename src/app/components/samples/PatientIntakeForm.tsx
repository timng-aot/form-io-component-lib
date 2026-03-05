import { TextField } from '../formio/TextField';
import { PhoneField } from '../formio/PhoneField';
import { SelectField } from '../formio/SelectField';
import { DateTimeField } from '../formio/DateTimeField';
import { PanelField } from '../formio/PanelField';
import { ColumnsField } from '../formio/ColumnsField';
import { ButtonField } from '../formio/ButtonField';

export function PatientIntakeForm() {
  return (
    <div className="space-y-6">
      {/* Section 1 */}
      <PanelField title="Section 1: Applicant Information">
        <div className="space-y-4">
          <ColumnsField columns={3}>
            <>
              <TextField label="First Name" required />
              <TextField label="Middle Name" />
              <TextField label="Last Name" required />
            </>
          </ColumnsField>

          <ColumnsField columns={2}>
            <>
              <TextField label="Social Insurance Number (SIN)" placeholder="___-___-___" required />
              <DateTimeField label="Date of Birth" required />
            </>
          </ColumnsField>

          <TextField label="Mailing Address (Street, Apt)" placeholder="e.g., 123 Maple Street, Apt 4B" required />

          <ColumnsField columns={3}>
            <>
              <TextField label="City" required />
              <TextField label="Province" required />
              <TextField label="Postal Code" placeholder="__ ___" required />
            </>
          </ColumnsField>

          <ColumnsField columns={2}>
            <>
              <PhoneField label="Primary Phone Number" placeholder="(___) ___-____" required />
              <SelectField
                label="Marital Status"
                required
                options={[
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married' },
                  { value: 'common-law', label: 'Common-law' },
                  { value: 'separated', label: 'Separated' },
                  { value: 'divorced', label: 'Divorced' },
                  { value: 'widowed', label: 'Widowed' },
                ]}
              />
            </>
          </ColumnsField>
        </div>
      </PanelField>

      {/* Section 2 */}
      <PanelField title="Section 2: Spouse or Common-law Partner's Information">
        <div className="space-y-4">
          <ColumnsField columns={3}>
            <>
              <TextField label="First Name" required />
              <TextField label="Middle Name" />
              <TextField label="Last Name" required />
            </>
          </ColumnsField>

          <ColumnsField columns={2}>
            <>
              <TextField label="Social Insurance Number (SIN)" placeholder="___-___-___" required />
              <DateTimeField label="Date of Birth" required />
            </>
          </ColumnsField>

          <TextField label="Mailing Address (Street, Apt)" placeholder="e.g., 123 Maple Street, Apt 4B" required />

          <ColumnsField columns={3}>
            <>
              <TextField label="City" required />
              <TextField label="Province" required />
              <TextField label="Postal Code" placeholder="__ ___" required />
            </>
          </ColumnsField>

          <PhoneField label="Primary Phone Number" placeholder="(___) ___-____" required />
        </div>
      </PanelField>

      {/* Submit */}
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
