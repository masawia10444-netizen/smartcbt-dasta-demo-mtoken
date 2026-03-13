import { z } from "zod";
import { step61Schema } from "./step6.1-schema";

export const step7Schema = step61Schema;
export type Step7Schema = z.infer<typeof step7Schema>;
