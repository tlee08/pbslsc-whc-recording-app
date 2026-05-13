import { z } from "zod";
import { memberShortSchema } from "./MemberShort";

export const resultsStructureSchema = z.record(
  z.string(),
  z.record(z.string(), z.record(z.string(), z.array(memberShortSchema))),
);

type ResultsStructure = z.infer<typeof resultsStructureSchema>;
export type { ResultsStructure as default };
