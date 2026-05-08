import { useEventStructureStore } from "../stores/eventStructureStore";
import { useMembersStore } from "../stores/membersStore";
import { useResultsStore } from "../stores/resultsStore";

function uploadAndSet<T>(
  event: React.ChangeEvent<HTMLInputElement>,
  setter: (data: T) => void,
): void {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataString = e?.target?.result;
    if (typeof dataString !== "string") return;
    setter(JSON.parse(dataString as string));
  };
  reader.readAsText(file);
}

export function uploadEventStructure(
  event: React.ChangeEvent<HTMLInputElement>,
): void {
  uploadAndSet(event, (data) =>
    useEventStructureStore.getState().setEventStructure(data),
  );
}

export function uploadMembers(
  event: React.ChangeEvent<HTMLInputElement>,
): void {
  uploadAndSet(event, (data) => useMembersStore.getState().setMembers(data));
}

export function uploadResults(
  event: React.ChangeEvent<HTMLInputElement>,
): void {
  uploadAndSet(event, (data) => useResultsStore.getState().setResults(data));
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
