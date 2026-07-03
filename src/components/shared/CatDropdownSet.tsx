import { Stack } from "@mantine/core";
import { useCatStore } from "../../stores/catStore";
import { useResultsStore } from "../../stores/resultsStore";
import {
  getDatesOptions,
  getEventsOptions,
  getGendersOptions,
} from "../../utils/getCatOptions";
import CatDropdown from "./CatDropdown";

export default function CatDropdownSet() {
  const { date, setDate, event, setEvent, gender, setGender } = useCatStore();
  const results = useResultsStore((s) => s.results);

  const datesOptions = getDatesOptions(results);
  const eventsOptions = getEventsOptions(results, date);
  const gendersOptions = getGendersOptions(results, date, event);

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
