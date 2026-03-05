import { TextField } from "../formio/TextField";
import { EmailField } from "../formio/EmailField";
import { SelectField } from "../formio/SelectField";
import { NumberField } from "../formio/NumberField";
import { CheckboxField } from "../formio/CheckboxField";
import { TextAreaComponent } from "../formio/TextArea";
import { DateTimeField } from "../formio/DateTimeField";
import { ColumnsField } from "../formio/ColumnsField";
import { PanelField } from "../formio/PanelField";
import { ButtonField } from "../formio/ButtonField";

export function RoomBooking() {
  return (
    <div className="space-y-6">
      <PanelField title="Booking Details">
        <ColumnsField columns={2}>
          <>
            <TextField label="Requester Name" placeholder="Your name" required />
            <EmailField label="Email" placeholder="Email address" required />
          </>
        </ColumnsField>
        <DateTimeField label="Date of Booking" required />
        <ColumnsField columns={2}>
          <>
            <TextField label="Start Time" placeholder="e.g., 9:00 AM" required />
            <TextField label="End Time" placeholder="e.g., 5:00 PM" required />
          </>
        </ColumnsField>
        <SelectField
          label="Room"
          placeholder="Select a room"
          required
          options={[
            { value: "board_room_a", label: "Board Room A" },
            { value: "board_room_b", label: "Board Room B" },
            { value: "meeting_room_1", label: "Meeting Room 1" },
            { value: "meeting_room_2", label: "Meeting Room 2" },
            { value: "training_room", label: "Training Room" },
            { value: "auditorium", label: "Auditorium" },
          ]}
        />
        <NumberField label="Number of Attendees" placeholder="0" required />
      </PanelField>
      <PanelField title="Equipment and Requirements">
        <CheckboxField label="Projector" />
        <CheckboxField label="Whiteboard" />
        <CheckboxField label="Video Conference" />
        <CheckboxField label="Microphone" />
        <TextAreaComponent
          label="Special Requirements"
          placeholder="Any additional requirements"
          rows={2}
        />
      </PanelField>
      <div className="flex justify-center pb-6">
        <ButtonField label="Submit" />
      </div>
    </div>
  );
}
