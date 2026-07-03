import { z } from "zod";
import { memberSchema } from "../models/Member";
import { resultsStructureSchema } from "../models/ResultsStructure";
import { useErrorStore } from "../stores/errorStore";
import { useMembersStore } from "../stores/membersStore";
import { useResultsStore } from "../stores/resultsStore";

const memberArraySchema = z.array(memberSchema);

function uploadWithSchema<T>(
  file: File | null,
  label: string,
  schema: z.ZodType<T>,
  set: (data: T) => void,
) {
  if (!file) return;
  const { addError } = useErrorStore.getState();
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    if (typeof target?.result !== "string") return;
    try {
      const parsed = JSON.parse(target.result);
      const result = schema.safeParse(parsed);
      if (!result.success) {
        return addError("Wrong structure", `${label}: ${result.error.message}`);
      }
      set(result.data);
    } catch {
      addError("Invalid JSON", `${label} file is not valid JSON`);
    }
  };
  reader.readAsText(file);
}

export function uploadMembers(file: File | null): void {
  uploadWithSchema(file, "Members", memberArraySchema, (data) =>
    useMembersStore.getState().setMembers(data),
  );
}

export function uploadResults(file: File | null): void {
  uploadWithSchema(file, "Results", resultsStructureSchema, (data) =>
    useResultsStore.getState().setResults(data),
  );
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
