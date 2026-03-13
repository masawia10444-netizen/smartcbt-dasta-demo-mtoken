
// TODO: edit project when api is ready

export enum ProjectStatus {
  Draft = "draft",
  WaitingForApprove = "waitingForApprove",
  Approved = "approved",
  OnGoing = "onGoing",
  Completed = "completed",
  Rejected = "rejected",
  PendingDelete = "pendingDelete",
}

export interface Project {
  id: string;
  name: string;
  organization: string;
  cost: number;
  year: number;
  createBy: string;
  location: string;
  status: ProjectStatus;
  community: {
    title: string;
  };
  province: {
    title: string;
  };
  exAnte: {
    npv: number;
    ratio: number;
  };
  exPost?: {
    npv: number;
    ratio: number;
  };
  startedAt: Date;
  endedAt: Date;
  updatedAt?: Date;
}