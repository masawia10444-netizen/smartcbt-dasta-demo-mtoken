import { mockFinancialProxies } from "@/models/financial-proxy";
import { z } from "zod";
import { Step8Schema } from "./step8-schema";

export const step6AnswerSchema = z.object({
  title: z.string(),
});

export const step6Question = z.object({
  title: z.string(),
  value: z.array(step6AnswerSchema),
});

export const step6Schema = z.object({
  sections: z.array(step6Question),
});

export type Step6Schema = z.infer<typeof step6Schema>;

export const step6DefaultValues = {
  sections: [],
};
export const step6DefaultValuesMocked: Step8Schema = {
  sensitivityAnalysis: true,
  proxyCreated: [],
  sections: [
    {
      title: "1. ระบบการค้นหาและสอบทานข้อมูลคนจนเป้าหมาย",
      value: [
        {
          title: "รายได้จากการจ้างงาน เก็บแบบสอบถาม (เพื่อขับเคลื่อนกิจกรรมแก้จนในพื้นที่)",
          benefitDetails: [
            {
              isCreatedProxy: false,
              proxy: mockFinancialProxies[0] as any,
              year: "2566",
              amount: 200000,
              unitPerYear: "บาท",
              maximumPercentage: 0,
              minimumPercentage: 0,
              isFilled: true,
              netBenefit: 222222,
              attribution: {
                hasAdditionalInfo: false,
                details: "-",
                benefitPercentage: 100,
                percentage: 0,
              },
              deadweight: {
                hasAdditionalInfo: true,
                details:
                  "เดิมกลไกรัฐมีการสำรวจ และมีการกลั่นกรองก่อนให้ความช่วยเหลือในระดับหนึ่ง คิดเป็นร้อยละ 50 โดยโครงการวิจัยมีบทบาทในการชี้เป้าคนจนจริง และส่งต่อความช่วยเหลือได้ทันทีโดยไม่ต้องใช้เวลาการกลั่นกรองเพิ่มเติม มีบทบาท ร้อยละ 50",
                benefitPercentage: 50,
                percentage: 50,
              },
              displacement: {
                hasAdditionalInfo: false,
                details: "-",
                benefitPercentage: 100,
                percentage: 0,
              },
              proxies: [],
            },
            {
              isCreatedProxy: false,
              proxy: mockFinancialProxies[1] as any,
              year: "2567",
              amount: 300000,
              unitPerYear: "บาท",
              isFilled: true,
              maximumPercentage: 0,
              minimumPercentage: 0,
              netBenefit: 333333,
              attribution: {
                hasAdditionalInfo: true,
                details:
                  "กลไกตำบล อำเภอ หรือจังหวัดนำโมเดลในการกลั่นกรองข้อมูลคนจน เพื่อส่งต่อความช่วยเหลือทำให้ การช่วยเหลือมีประสิทธิภาพ มีบทบาทร้อยละ 95",
                benefitPercentage: 95,
                percentage: 5,
              },
              deadweight: {
                hasAdditionalInfo: false,
                details: "-",
                benefitPercentage: 100,
                percentage: 0,
              },
              displacement: {
                hasAdditionalInfo: false,
                details: "-",
                benefitPercentage: 60,
                percentage: 40,
              },
              proxies: [],
            },
          ],
        },
        {
          title: "ภาครัฐประหยัดงบประมาณ (ลดระยะเวลาในการจัดเก็บข้อมูลของรัฐ) ข้อมูล จปฐ.",
          benefitDetails: [],
        },
        {
          title: "เพิ่มศักยภาพการทำงานของหน่วยงานภาครัฐ (Inclusion Error)",
          benefitDetails: [],
        },
      ],
      referenceDocuments: [],
    },
  ],
};
