import { z } from "zod";

export const memberShortSchema = z.object({
  id: z.string(),
  title: z.string(),
});

type MemberShort = z.infer<typeof memberShortSchema>;
export type { MemberShort as default };
