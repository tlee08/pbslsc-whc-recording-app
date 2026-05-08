import { Box } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: { xs: 1.5, sm: 2 },
        p: { xs: 1.5, sm: 2 },
      }}
    >
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
    </Box>
  );
}
