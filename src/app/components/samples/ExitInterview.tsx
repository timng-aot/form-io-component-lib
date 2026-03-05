import { TextField } from '../formio/TextField';
import { SelectField } from '../formio/SelectField';
import { SurveyField } from '../formio/SurveyField';
import { TextAreaComponent } from '../formio/TextArea';
import { WizardField } from '../formio/WizardField';

export function ExitInterview() {
  return (
    <WizardField
      pages={[
        {
          title: 'Employee Details',
          children: (
            <div className="space-y-4">
              <TextField label="Department" placeholder="Your department" required />
              <SelectField
                label="Tenure"
                placeholder="Select tenure"
                required
                options={[
                  { value: 'less-than-1', label: 'Less than 1 year' },
                  { value: '1-2', label: '1–2 years' },
                  { value: '3-5', label: '3–5 years' },
                  { value: '5-10', label: '5–10 years' },
                  { value: '10+', label: '10+ years' },
                ]}
              />
              <SelectField
                label="Primary Reason for Leaving"
                placeholder="Select reason"
                required
                options={[
                  { value: 'career-growth', label: 'Career Growth' },
                  { value: 'compensation', label: 'Compensation' },
                  { value: 'work-life-balance', label: 'Work-Life Balance' },
                  { value: 'management', label: 'Management' },
                  { value: 'relocation', label: 'Relocation' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>
          ),
        },
        {
          title: 'Satisfaction Ratings',
          children: (
            <SurveyField
              label="Please rate the following areas"
              required
              questions={['Manager Support', 'Growth Opportunities', 'Work-Life Balance', 'Compensation']}
              options={['1', '2', '3', '4', '5']}
            />
          ),
        },
        {
          title: 'Additional Feedback',
          children: (
            <TextAreaComponent
              label="Additional Feedback"
              placeholder="Share any additional thoughts or suggestions (optional)"
              rows={5}
            />
          ),
        },
      ]}
    />
  );
}
