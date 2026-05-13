import { z } from "zod";

const genderSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const eventSchema = z.object({
  label: z.string(),
  value: z.string(),
  genders: z.array(genderSchema),
});

const dateSchema = z.object({
  label: z.string(),
  value: z.string(),
  events: z.array(eventSchema),
});

export const eventStructureSchema = z.object({
  dates: z.array(dateSchema),
});

type EventStructure = z.infer<typeof eventStructureSchema>;
export type { EventStructure as default };
