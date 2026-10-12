import { lookups, meetings } from "../data";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function meetingLabel(id: string, seriesKey: string): string {
  const [datePart] = id.split("_");
  const yy = Number(datePart.slice(0, 2));
  const mm = Number(datePart.slice(2, 4));
  const dd = Number(datePart.slice(4, 6));
  const seriesLabel = lookups.series[seriesKey]?.label ?? seriesKey;
  return `${dd} ${MONTHS[mm - 1] ?? mm} ${2000 + yy} - ${seriesLabel}`;
}

export function getMeetingOptions() {
  return meetings.map((m) => ({ label: meetingLabel(m.id, m.series), value: m.id }));
}

export function getEventOptions(meetingId: string) {
  const meeting = meetings.find((m) => m.id === meetingId);
  if (!meeting) return [];
  const series = lookups.series[meeting.series];
  if (!series) return [];
  return series.events.map((key) => ({
    label: lookups.events[key]?.label ?? key,
    value: key,
  }));
}

export function getGenderOptions(event: string) {
  const ev = lookups.events[event];
  if (!ev) return [];
  return ev.genders.map((key) => ({
    label: lookups.genders[key]?.label ?? key,
    value: key,
  }));
}
