import { z } from "zod";

export const memberSchema = z.object({
  title: z.string(),
  gender: z.string(),
});

type Member = z.infer<typeof memberSchema>;
export type { Member as default };
