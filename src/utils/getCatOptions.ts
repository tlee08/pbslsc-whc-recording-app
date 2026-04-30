import { readEventStructure } from "./storageUtils";

function getDatesOptions() {
  return readEventStructure().dates.map((e) => ({
    label: e.label,
    value: e.value,
  }));
}
function getEventsOptions(dateValue: string) {
  return (
    readEventStructure()
      .dates.find((e) => e.value === dateValue)
      ?.events.map((e) => ({
        label: e.label,
        value: e.value,
      })) ?? []
  );
}
function getGendersOptions(dateValue: string, eventValue: string) {
  return (
    readEventStructure()
      .dates.find((e) => e.value === dateValue)
      ?.events.find((e) => e.value === eventValue)
      ?.genders.map((e) => ({
        label: e.label,
        value: e.value,
      })) ?? []
  );
}

export { getDatesOptions, getEventsOptions, getGendersOptions };
