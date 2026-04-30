import { Box } from "@mui/material";
import { useCatContext } from "../../hooks/useCatContext";
import {
  getDatesOptions,
  getEventsOptions,
  getGendersOptions,
} from "../../utils/getCatOptions";
import CatDropdown from "./CatDropdown";

export default function CatDropdownSet() {
  const { date, setDate, event, setEvent, gender, setGender } = useCatContext();

  const datesOptions = getDatesOptions();
  const eventsOptions = getEventsOptions(date);
  const gendersOptions = getGendersOptions(date, event);

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
