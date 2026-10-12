import { z } from "zod";

export const resultsStructureSchema = z.record(
  z.string(),
  z.record(z.string(), z.record(z.string(), z.array(z.string()))),
);

type ResultsStructure = z.infer<typeof resultsStructureSchema>;
export type { ResultsStructure as default };
