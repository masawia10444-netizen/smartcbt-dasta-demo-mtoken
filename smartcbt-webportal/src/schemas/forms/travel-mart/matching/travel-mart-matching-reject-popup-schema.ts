import { z } from "zod";
export enum RejectNegotiationSelect {
  changeTime = "ChangeTime",
  other = "Other",
}

const rejectNegotiationChangeTimeSchema = z.object({
  date: z.string(),
  round: z.string(),
  time: z.string(),
});

export const travelMartRejectNegotiationSelectionSchema = z.object({
  selected: z.nativeEnum(RejectNegotiationSelect),
  changeTime: rejectNegotiationChangeTimeSchema,
  other: z.string(),
});

export type TravelMartRejectNegotiationSelectionSchema = z.infer<typeof travelMartRejectNegotiationSelectionSchema>;
