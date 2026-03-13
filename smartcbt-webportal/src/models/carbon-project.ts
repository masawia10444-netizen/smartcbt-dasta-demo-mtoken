import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation";

export enum CarbonProjectStatus {
  Draft = "draft",
  WaitingForApprove = "pending_for_approval",
  Approved = "approved",
  PendingDelete = "request_to_delete",
  Rejected = "rejected",
}

export const unit = "kgCO2eq";

export interface CarbonProject {
  id: string;
  name: string;
  community: {
    title: string;
  };
  province: ProvinceJSONData;
  footprintPerPersonPerDay: number;
  footprintTotal: number;
  createBy: string;
  approvedAt: Date;
  status: CarbonProjectStatus;
}

const project: CarbonProject = {
  id: "1",
  name: "โครงการส่งเสริมการใช้พลังงานธรรมชาติ เพื่อการเกษตรอย่างยั่งยืนและยกระดับ คุณภาพชีวิตของคนในชุมชน qiwdjqoiwdj opqiwj dpoijqwodijqwopi jdopiqwjpd ijqwo djpqwi",

  province: {
    id: 1,
    title: "พิษณุโลก",
  },
  footprintPerPersonPerDay: 1000,
  footprintTotal: 13000,
  approvedAt: new Date(),
  createBy: "มินตรา พิธาร",
  status: CarbonProjectStatus.Approved,
  community: {
    title: "เนินมะกอก",
  },
};

export const mockCarbonProjects: CarbonProject[] = [
  {
    ...project,
    id: "1",
    name: "พักผ่อนหย่อนใจ 2 วัน 1 คืน ที่พัทยาและเกาะล้าน",
    status: CarbonProjectStatus.Approved,
  },
  {
    ...project,
    id: "2",
    status: CarbonProjectStatus.Draft,
  },
  {
    ...project,
    id: "3",
    status: CarbonProjectStatus.Approved,
  },
  {
    ...project,
    id: "4",
    status: CarbonProjectStatus.Draft,
  },
  {
    ...project,
    id: "5",
    status: CarbonProjectStatus.WaitingForApprove,
  },
  {
    ...project,
    id: "6",
    status: CarbonProjectStatus.PendingDelete,
  },
  {
    ...project,
    id: "7",
    status: CarbonProjectStatus.Rejected,
  },
  {
    ...project,
    id: "8",
    status: CarbonProjectStatus.Approved,
  },
];
