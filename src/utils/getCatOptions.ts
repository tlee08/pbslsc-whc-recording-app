import type EventStructure from '../models/EventStructure'

function getDatesOptions(eventStructure: EventStructure) {
  return eventStructure.dates.map((e) => ({
    label: e.label,
    value: e.value,
  }))
}
function getEventsOptions(eventStructure: EventStructure, dateValue: string) {
  return (
    eventStructure.dates
      .find((e) => e.value === dateValue)
      ?.events.map((e) => ({
        label: e.label,
        value: e.value,
      })) ?? []
  )
}
function getGendersOptions(
  eventStructure: EventStructure,
  dateValue: string,
  eventValue: string,
) {
  return (
    eventStructure.dates
      .find((e) => e.value === dateValue)
      ?.events.find((e) => e.value === eventValue)
      ?.genders.map((e) => ({
        label: e.label,
        value: e.value,
      })) ?? []
  )
}

export { getDatesOptions, getEventsOptions, getGendersOptions }
