import { Stack } from "@mantine/core";
import { useCatStore } from "../../stores/catStore";
import { useEventStructureStore } from "../../stores/eventStructureStore";
import {
  getDatesOptions,
  getEventsOptions,
  getGendersOptions,
} from "../../utils/getCatOptions";
import CatDropdown from "./CatDropdown";

export default function CatDropdownSet() {
  const { date, setDate, event, setEvent, gender, setGender } = useCatStore();
  const eventStructure = useEventStructureStore((s) => s.eventStructure);

  const datesOptions = getDatesOptions(eventStructure);
  const eventsOptions = getEventsOptions(eventStructure, date);
  const gendersOptions = getGendersOptions(eventStructure, date, event);

  return (
    <Stack gap={{ base: 6, sm: 8 }} p={{ base: 6, sm: 8 }}>
      <CatDropdown
        title="Date"
        data={datesOptions}
        value={date}
        setValue={setDate}
        disabled={false}
      />
      <CatDropdown
        title="Event"
        data={eventsOptions}
        value={event}
        setValue={setEvent}
        disabled={date === ""}
      />
      <CatDropdown
        title="Gender"
        data={gendersOptions}
        value={gender}
        setValue={setGender}
        disabled={event === ""}
      />
    </Stack>
  );
}
