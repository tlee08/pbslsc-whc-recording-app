import lookupsJson from "./lookups.json";
import meetingsJson from "./meetings.json";
import {
  lookupsSchema,
  meetingsSchema,
  type Lookups,
  type Meeting,
} from "../models/lookups";

export const lookups: Lookups = lookupsSchema.parse(lookupsJson);
export const meetings: Meeting[] = meetingsSchema.parse(meetingsJson);
