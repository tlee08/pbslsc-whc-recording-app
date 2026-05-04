import type EventStructure from "../models/EventStructure";
import type Member from "../models/Member";
import type MemberShort from "../models/MemberShort";
import type ResultsStructure from "../models/ResultsStructure";

// Keys

export function resultsKey() {
  return "results";
}

export function eventStructureKey() {
  return "eventStructure";
}

export function membersKey() {
  return "members";
}

// Reading data

export function readEventStructure(): EventStructure {
  const stored = sessionStorage.getItem(eventStructureKey());
  return stored ? JSON.parse(stored) : { dates: [] };
}

export function readMembers(): Member[] {
  const stored = sessionStorage.getItem(membersKey());
  return stored ? JSON.parse(stored) : [];
}

export function readResults(): ResultsStructure {
  const stored = sessionStorage.getItem(resultsKey());
  return stored ? JSON.parse(stored) : {};
}

// Writing data

export function writeResults(
  date: string,
  event: string,
  gender: string,
  results: MemberShort[],
): void {
  const data = readResults();
  data[date] = data[date] ?? {};
  data[date][event] = data[date][event] ?? {};
  data[date][event][gender] = results;
  sessionStorage.setItem(resultsKey(), JSON.stringify(data));
}

// File upload/download utilities

export function uploadJson(
  event: React.ChangeEvent<HTMLInputElement>,
  storageKey: string,
): void {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataString = e?.target?.result;
    if (typeof dataString !== "string") return;
    sessionStorage.setItem(storageKey, dataString);
    window.location.reload();
  };
  reader.readAsText(file);
}

export function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
