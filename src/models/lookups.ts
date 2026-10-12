import { z } from "zod";

export const genderSchema = z.object({ label: z.string() });

export const eventSchema = z.object({
  label: z.string(),
  genders: z.array(z.string()),
});

export const seriesSchema = z.object({
  label: z.string(),
  events: z.array(z.string()),
});

export const lookupsSchema = z.object({
  genders: z.record(z.string(), genderSchema),
  events: z.record(z.string(), eventSchema),
  series: z.record(z.string(), seriesSchema),
});

export const meetingSchema = z.object({
  id: z.string(),
  series: z.string(),
});

export const meetingsSchema = z.array(meetingSchema);

export type Lookups = z.infer<typeof lookupsSchema>;
export type Meeting = z.infer<typeof meetingSchema>;
