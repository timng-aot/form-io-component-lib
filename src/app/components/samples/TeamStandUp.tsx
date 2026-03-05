import { TextField } from '../formio/TextField';
import { DateTimeField } from '../formio/DateTimeField';
import { TextAreaComponent } from '../formio/TextArea';
import { ButtonField } from '../formio/ButtonField';

export function TeamStandUp() {
  return (
    <div className="space-y-6">
      <TextField label="Team Member Name" placeholder="Enter your full name" required />
      <DateTimeField label="Date" required />
      <TextAreaComponent
        label="What I Completed Yesterday"
        placeholder="Summarize what you accomplished"
        rows={3}
      />
      <TextAreaComponent
        label="What I'm Working On Today"
        placeholder="Describe your plan for today"
        rows={3}
      />
      <TextAreaComponent
        label="Blockers or Issues"
        placeholder="Any blockers or concerns?"
        rows={2}
      />
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
