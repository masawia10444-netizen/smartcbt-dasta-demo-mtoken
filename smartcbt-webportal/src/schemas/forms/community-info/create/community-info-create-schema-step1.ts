import { z } from "zod";
import { district, province, subdistrict } from "../../shard-schema";

// Utility function to add custom issues
function addIssue(ctx: z.RefinementCtx, path: string[], error: string) {
  return ctx.addIssue({
    code: z.ZodIssueCode.custom,
    path: path,
    message: error,
  });
}

const file = z.object({
  id: z.string(),
  url: z.string(),
  type: z.string(),
});

const files = z.array(file);

// Schema for step 1 data
export const step1Schema = z.object({
  coordinators: z.array(
    z.object({
      firstname: z.string().trim().nonempty(),
      lastname: z.string().trim().nonempty(),
      mobile: z.string().trim().nonempty(),
      email: z.string().trim().email(),
      line: z.string().trim().nonempty(),
    })
  ),
  community: z.object({
    name: z.string().trim(),
    address: z.string().trim(),
    province: province,
    district: district,
    subdistrict: subdistrict,
    postcode: z.string().trim(),
  }),
  detail: z.string().nonempty(),
  activity: z.object({
    activities: z.array(z.object({ title: z.string().nonempty() })).min(1),
    tourismProducts: z.array(z.object({ title: z.string().nonempty() })),
    foodMenus: z.array(z.object({ title: z.string().nonempty() })),
    standardsOrAwards: z.array(z.object({ title: z.string().nonempty() })),
    activityPrice: z.number().optional(),
    accommodateMin: z.number().optional(),
    accommodateMax: z.number().optional(),
    lifestyle: z.string().nonempty(),
    language: z.string().nonempty(),
    communityHighlights: z.string().trim(),
    organizationalUnit: z.string().trim().optional(),
    season: z.array(z.object({ id: z.number(), value: z.boolean() })),
  }),
  travelBookingContacts: z.array(
    z.object({
      firstname: z.string().trim().nonempty(),
      lastname: z.string().trim().nonempty(),
      mobile: z.string().trim().nonempty(),
    })
  ),
  media: z.object({
    images: files.optional(),
    videos: files.optional(),
    featuredImage: file.optional().nullable(),
  }),
  presentation: z
    .object({
      hasYoutube: z.boolean().default(false),
      hasFacebook: z.boolean().default(false),
      hasInstagram: z.boolean().default(false),
      hasTiktok: z.boolean().default(false),
      hasDocument: z.boolean().default(false),
      hasOther: z.boolean().default(false),
      youtubeLink: z.string().trim().optional(),
      facebookLink: z.string().trim().optional(),
      instagramLink: z.string().trim().optional(),
      tiktokLink: z.string().trim().optional(),
      documents: file.optional(),
      other: z.string().trim().optional(),
    })
    .superRefine((form, ctx) => {
      const {
        hasYoutube,
        hasFacebook,
        hasInstagram,
        hasTiktok,
        hasDocument,
        hasOther,
        youtubeLink,
        facebookLink,
        instagramLink,
        tiktokLink,
        documents,
        other,
      } = form;
      if (hasYoutube && (!youtubeLink || !youtubeLink.length)) addIssue(ctx, ["youtubeLink"], "Required");
      if (hasFacebook && (!facebookLink || !facebookLink.length)) addIssue(ctx, ["facebookLink"], "Required");
      if (hasInstagram && (!instagramLink || !instagramLink.length)) addIssue(ctx, ["instagramLink"], "Required");
      if (hasTiktok && (!tiktokLink || !tiktokLink.length)) addIssue(ctx, ["tiktokLink"], "Required");
      if (hasDocument && !documents) addIssue(ctx, ["documents"], "Required");
      if (hasOther && (!other || !other.length)) addIssue(ctx, ["other"], "Required");
    }),
  tags: z.array(z.string().trim()).optional(),
});

export type FileSchema = z.infer<typeof file>;
export type FilesSchema = z.infer<typeof files>;
