export enum REQUEST_BY {
  ORGANIZATION = "organization",
  COMMUNITY = "community",
}

export enum ScheduleStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  "IN-PROGRESS" = "IN-PROGRESS",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
  "CHANGE-SLOT" = "CHANGE-SLOT",
}

export const SCHEDULE_STATUS = {
  PENDING: "PENDING",
  OPEN: "OPEN",
  "IN-PROGRESS": "IN-PROGRESS",
  COMPLETED: "COMPLETED",
  CLOSED: "CLOSED",
  REJECTED: "REJECTED",
  "CHANGE-SLOT": "CHANGE-SLOT",
};

export const COMMUNITY_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  PENDING: "pending",
  REJECT: "rejected",
  ALL: "all",
};

export const FINANCIAL_PROXY_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const FINANCIAL_PROXY_LEVEL = {
  MINOR: "MINOR",
  MAJOR: "MAJOR",
};

export enum PROJECT_STATUS {
  DRAFT= "draft", //ร่างโครงการ
  PENDING_FOR_APPROVAL= "pending_for_approval", // รอการอนุมัติ
  APPROVAL= "approved", // อนุมัติ
  REJECTED= "rejected", //ถูกปฏิเสธ
  IN_PROGRESS= "inprogress", // อยู่ระหว่างดำเนินการ
  DONE= "done", // เสร็จสิ้น
  REQUEST_TO_DELETE= "request_to_delete", // คำขอลบโครงการ
  DELETED= "deleted", // ลบ
};


export const CARBON_PROGRAM_STATUS = {
  DRAFT: "draft", //ร่างโครงการ
  PENDING_FOR_APPROVAL: "pending_for_approval", // รอการอนุมัติ
  APPROVAL: "approved", // อนุมัติแล้ว
  REJECTED: "rejected", //โปรแกรมถูกปฏิเสธ
  REQUEST_TO_DELETE: "request_to_delete", // คำขอยุติโปรแกรม
  DELETED: "deleted", // ลบ
};


export const CLAIM_STATUS = {
  REQUEST_TO_CLAIM: "request_to_claim", // รอชุมชนตอบกลับ
  APPROVAL: "approved", // อนุมัติแล้ว
  REJECTED: "rejected", // ปฏิเสธ
};
