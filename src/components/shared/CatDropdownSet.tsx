import { Stack } from "@mantine/core";
import { useCatStore } from "../../stores/catStore";
import {
  getMeetingOptions,
  getEventOptions,
  getGenderOptions,
} from "../../utils/getCatOptions";
import CatDropdown from "./CatDropdown";

export default function CatDropdownSet() {
  const { meetingId, setMeetingId, event, setEvent, gender, setGender } =
    useCatStore();

  const meetingOptions = getMeetingOptions();
  const eventOptions = getEventOptions(meetingId);
  const genderOptions = getGenderOptions(event);

  return (
    <Stack gap={8} p={{ base: 6, sm: 8 }}>
      <CatDropdown
        title="Date"
        data={meetingOptions}
        value={meetingId}
        setValue={setMeetingId}
        disabled={false}
      />
      <CatDropdown
        title="Event"
        data={eventOptions}
        value={event}
        setValue={setEvent}
        disabled={meetingId === ""}
      />
      <CatDropdown
        title="Gender"
        data={genderOptions}
        value={gender}
        setValue={setGender}
        disabled={event === ""}
      />
    </Stack>
  );
}
