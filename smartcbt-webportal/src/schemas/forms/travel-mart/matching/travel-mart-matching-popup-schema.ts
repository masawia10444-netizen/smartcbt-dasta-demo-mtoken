import { z } from "zod";

export const travelMartRequestNegotiationSelectionSchema = z.object({
  date: z.string(),
  round: z.string(),
  time: z.object({ id: z.string(), dateTime: z.string(), status: z.string() }),
  needGuide: z.boolean(),
});

export const travelMartRequestNegotiationSchema = z.object({
  dateSelect: travelMartRequestNegotiationSelectionSchema,
});

export type TravelMartRequestNegotiationSchema = z.infer<typeof travelMartRequestNegotiationSchema>;
export type TravelMartRequestNegotiationSelectionSchema = z.infer<typeof travelMartRequestNegotiationSelectionSchema>;
