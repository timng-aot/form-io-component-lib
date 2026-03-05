import { TextField } from '../formio/TextField';
import { DateTimeField } from '../formio/DateTimeField';
import { TextAreaComponent } from '../formio/TextArea';
import { CurrencyField } from '../formio/CurrencyField';
import { ColumnsField } from '../formio/ColumnsField';
import { WizardField } from '../formio/WizardField';

export function TravelPreApproval() {
  return (
    <WizardField
      pages={[
        {
          title: 'Traveller Details',
          children: (
            <div className="space-y-4">
              <ColumnsField columns={2}>
                <>
                  <TextField label="Traveller Name" placeholder="Full name" required />
                  <TextField label="Department" placeholder="Department" required />
                </>
              </ColumnsField>
              <TextField label="Destination" placeholder="City, country" required />
              <ColumnsField columns={2}>
                <>
                  <DateTimeField label="Travel Start Date" required />
                  <DateTimeField label="Travel End Date" required />
                </>
              </ColumnsField>
              <TextAreaComponent label="Purpose of Travel" placeholder="Describe the purpose of this trip" rows={3} />
            </div>
          ),
        },
        {
          title: 'Estimated Costs',
          children: (
            <div className="space-y-4">
              <ColumnsField columns={3}>
                <>
                  <CurrencyField label="Airfare" placeholder="0.00" currency="$" />
                  <CurrencyField label="Hotel" placeholder="0.00" currency="$" />
                  <CurrencyField label="Ground Transport" placeholder="0.00" currency="$" />
                </>
              </ColumnsField>
              <ColumnsField columns={2}>
                <>
                  <CurrencyField label="Meals" placeholder="0.00" currency="$" />
                  <CurrencyField label="Other" placeholder="0.00" currency="$" />
                </>
              </ColumnsField>
              <CurrencyField label="Total Estimated Cost" placeholder="0.00" currency="$" required />
              <TextField label="Manager's Name" placeholder="For reference" required />
            </div>
          ),
        },
      ]}
    />
  );
}
