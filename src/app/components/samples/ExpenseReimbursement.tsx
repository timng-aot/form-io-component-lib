import { TextField } from '../formio/TextField';
import { DateTimeField } from '../formio/DateTimeField';
import { SelectField } from '../formio/SelectField';
import { TextAreaComponent } from '../formio/TextArea';
import { CurrencyField } from '../formio/CurrencyField';
import { FileField } from '../formio/FileField';
import { ColumnsField } from '../formio/ColumnsField';
import { ButtonField } from '../formio/ButtonField';

export function ExpenseReimbursement() {
  return (
    <div className="space-y-6">
      <ColumnsField columns={2}>
        <>
          <TextField label="Employee Name" placeholder="Enter your full name" required />
          <TextField label="Department" placeholder="e.g. Engineering, Marketing" required />
        </>
      </ColumnsField>
      <DateTimeField label="Expense Date" required />
      <SelectField
        label="Category"
        placeholder="Select a category"
        required
        options={[
          { value: 'travel', label: 'Travel' },
          { value: 'meals', label: 'Meals' },
          { value: 'supplies', label: 'Supplies' },
          { value: 'software', label: 'Software' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <ColumnsField columns={2}>
        <>
          <CurrencyField label="Amount" placeholder="0.00" required currency="$" />
          <SelectField
            label="Currency"
            placeholder="Select currency"
            required
            options={[
              { value: 'cad', label: 'CAD' },
              { value: 'usd', label: 'USD' },
              { value: 'eur', label: 'EUR' },
              { value: 'gbp', label: 'GBP' },
            ]}
          />
        </>
      </ColumnsField>
      <TextAreaComponent
        label="Description"
        placeholder="Briefly describe the expense"
        rows={2}
      />
      <FileField label="Receipt Upload" description="Upload a photo or scan of your receipt" required />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
