import { z } from "zod";

export const memberSchema = z.object({
  name: z.string(),
  dob: z.string(),
  gender: z.string(),
  club: z.string(),
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  title: z.string(),
});

type Member = z.infer<typeof memberSchema>;
export type { Member as default };
