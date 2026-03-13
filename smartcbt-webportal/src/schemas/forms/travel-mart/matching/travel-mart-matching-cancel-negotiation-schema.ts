import { z } from "zod";

export const travelMartMatchingCancelNegotiationSchema = z.object({ other: z.string() });
export type TravelMartMatchingCancelNegotiationSchema = z.infer<typeof travelMartMatchingCancelNegotiationSchema>;
