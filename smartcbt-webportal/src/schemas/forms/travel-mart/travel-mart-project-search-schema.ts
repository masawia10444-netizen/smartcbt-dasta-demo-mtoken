import { z } from "zod";
import { province } from "../shard-schema";

export const travelMartProjectSearchSchema = z.object({
  q: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  typeEvent: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  regions: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  province: province.optional(),
});

export type TravelMartProjectSearchSchema = z.infer<typeof travelMartProjectSearchSchema>;
