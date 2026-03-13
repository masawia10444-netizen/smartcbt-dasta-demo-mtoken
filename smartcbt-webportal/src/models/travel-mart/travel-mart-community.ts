import { Collection } from "@/utils/cms/cms-type";
import { DateTime } from "luxon";

// Models from Hx.
export type Community = Collection["communities"] & {
  score: number | null;
  link: {
    presentation_asset: string | null;
    video_url: string | null;
  } | null;
};

export type CommunityDetail = Omit<
  Collection["communities"],
  "featured_image" | "tourism_activities" | "galleries" | "community_way_of_life" | "attraction_type" | "awards"
> & {
  featured_image?: {
    id?: string | null;
    url?: string | null;
    type?: string | null;
  } | null;
  tourism_activities?:
    | {
        id?: string | null;
        title?: string | null;
      }[]
    | null;
  galleries?:
    | {
        id?: string | null;
        url?: string | null;
        type?: string | null;
      }[]
    | null;
  tourism_info?: {
    tourist_accomodate_min?: number | null;
    tourist_accomodate_max?: number | null;
    traveling_recommended_during?:
      | {
          id: string | null;
          title: string | null;
        }[]
      | null;
    address_info?: {
      address_1?: string | null;
      address_2?: string | null;
      province?: string | null;
      district?: string | null;
      subdistrict?: string | null;
      postal_code?: string | null;
    } | null;
  } | null;
  awards?:
    | {
        id?: number | null;
        title?: string | null;
      }[]
    | null;
  attraction_type?:
    | {
        id?: number | null;
        title?: string | null;
        titleshort?: string | null;
      }[]
    | null;
  community_way_of_life?: {
    way_of_life?: string | null;
    local_language?: string | null;
    food_menus?: string | null;
    products?: string | null;
  } | null;
  presentations?: {
    files?: { id: number | null; url: string | null; type: string | null }[] | null;
    video?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    other?: string | null;
  };
  facilities?:
    | {
        id?: number | null;
        title?: string | null;
        quantity?: number | null;
        quantity_flag?: boolean | null;
        unit_quantity?: string | null;
        size?: number | null;
        size_flag?: true;
        unit_size?: string | null;
        group?: {
          id?: number | null;
          title?: string | null;
        } | null;
      }[]
    | null;
  contacts?:
    | {
        firstname?: string | null;
        lastname?: string | null;
        email?: string | null;
        mobile?: string | null;
        line?: string | null;
      }[]
    | null;
  tour_agent?:
    | {
        firstname?: string | null;
        lastname?: string | null;
        mobile?: string | null;
      }[]
    | null;
};

export type AttractionType = Collection["community_tourist_attraction_type"];

type ContactPoint = {
  firstname: string | null;
  lastname: string | null;
  mobile: string | null;
  email: string | null;
  line: string | null;
};

type AddressInfo = {
  address: string | null | undefined;
  province_id: number | null;
  district_id: number | null;
  sub_district_id: number | null;
  postal_code: string | null;
};

type ActivityItem = {
  title: string | null;
};

type TourAgent = {
  firstname: string | null;
  lastname: string | null;
  mobile: string | null;
};

export type File = {
  id?: string | null;
  url?: string | null;
  type?: string | null;
};

export type Facility = {
  facility: number | null;
  size: number | null;
  quantity: number | null;
};

export type CommunityForm = {
  contact_points?: ContactPoint[] | null;
  title?: string | null;
  description?: string | null;
  address_info?: AddressInfo | null;
  tourism_activities?: ActivityItem[] | null;
  tourism_products?: ActivityItem[] | null;
  food_menus?: ActivityItem[] | null;
  awards?: ActivityItem[] | null;
  traveling_recommended_during?: number[] | null;
  tourism_activities_prices?: number | null;
  tourist_accomodate_min?: number | null;
  tourist_accomodate_max?: number | null;
  community_way_of_life?: string | null;
  highlight?: string | null;
  community_local_language?: string | null;
  tour_agents?: TourAgent[] | null;
  featured_image?: File | null;
  galleries?: string[];
  gallery_infos?: File[] | null;
  videos?: string[];
  video_infos: File[] | null;
  presentation_video?: string | null;
  presentation_facebook?: string | null;
  presentation_instagram?: string | null;
  presentation_tiktok?: string | null;
  presentations?: string | null;
  presentation_other?: string | null;
  facilities?: Facility[] | null;
  tourist_target_groups?: number[];
  attraction_type?: number[];
  tourist_travel_countries?: number[];
  tourist_travel_regions?: number[];
};

export type CommunityOption = {
  id: number | undefined;
  title: string;
};

// Mock models
export enum MockActivityStatus {
  Draft = "draft",
  WaitingForApprove = "waitingForApprove",
  Approved = "approved",
  Rejected = "rejected",
}

export enum MockNegotiationStatus {
  Ready = "ready",
  AppointmentRequested = "appointmentRequested",
  AppointmentDatetimeRequested = "appointmentDatetimeRequested",
  EntrepreneurRejected = "entrepreneurRejected",
  CommunityRejected = "communityRejected",
  Completed = "completed",
}

interface MockCoordinator {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  lineId: string;
  email: string;
}

interface MockCommunityDetail {
  name: string;
  address: string;
  province: MockProvince;
  district: MockDistrict;
  subdistrict: MockSubDistrict;
  postcode: string;
}

interface MockActivity {
  activities?: string[];
  tourismProducts?: string[];
  foodMenus?: string[];
  standardsOrAwards?: string[];
  activityPrice?: number;
  lifestyle?: string;
  language?: string;
  season?: MockSeason;
  visitorCapacityMinMax?: number;
  communityHighlights?: string;
  organizationalUnit?: string;
}

interface MockTravelBookingContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface MockPresentation {
  hasYoutube?: boolean;
  hasFacebook?: boolean;
  hasInstagram?: boolean;
  hasTiktok?: boolean;
  hasDocument?: boolean;
  hasOther?: boolean;
  youtubeLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  tiktokLink?: string;
  documents?: string[];
  other?: string;
}

interface MockNumberWithCapacity {
  isAvailable?: boolean;
  number?: number;
  maxCapacity?: number;
}

interface MockTextWithCapacity {
  isAvailable?: boolean;
  text?: string;
  maxCapacity?: number;
}

interface MockNumber {
  isAvailable?: boolean;
  number?: number;
}

interface MockText {
  isAvailable?: boolean;
  text?: string;
}

interface MockProvince {
  id: number;
  title: string;
}

interface MockDistrict {
  id: number;
  title: string;
}

interface MockSubDistrict {
  id: number;
  title: string;
}

interface MockSeason {
  id: string;
  name: string;
  value: string;
}

export interface MockTouristVehicle {
  isAvailable?: boolean;
  boat?: MockNumberWithCapacity;
  motorcycle?: MockNumberWithCapacity;
  car?: MockNumberWithCapacity;
  van?: MockNumberWithCapacity;
  tourBus?: MockNumberWithCapacity;
  other?: MockTextWithCapacity;
}

export interface MockEntrepreneur {
  name: string;
}

export interface MockCommunity {
  id?: number;
  coordinator?: MockCoordinator[];
  communityDetail?: MockCommunityDetail;
  detail?: string;
  activity?: MockActivity;
  travelBookingContacts?: MockTravelBookingContact[];
  presentation?: MockPresentation;
  tags?: string[];
  homestay?: MockNumberWithCapacity;
  touristVehicle?: MockTouristVehicle;
  parking?: MockNumber;
  restroom?: MockNumber;
  meetingRoom?: MockNumber;
  guide?: MockNumber;
  facilitiesForDisability?: MockText;
  hasWifi?: boolean;
  hasElectricity?: boolean;
  hasTapWater?: boolean;
  hasSouvenirShop?: boolean;
  hasConvenienceStore?: boolean;
  hasCctv?: boolean;
  dataDissemination?: boolean;
  consent?: boolean;
  isRecommended?: boolean;
  createdAt?: DateTime;
  appointmentAt?: DateTime;
  entrepreneur?: MockEntrepreneur;
  status?: MockActivityStatus;
  rejectReason?: string;
  negotiationStatus?: MockNegotiationStatus;
  rejectNegotiationReason?: string;
  touristTargetGroups: number[];
  touristTravelRegions: number[];
  touristTravelCountries: number[];
  attractionType?: number[];
}

export const sampleData: MockCommunity = {
  coordinator: [
    {
      firstName: "aaa",
      lastName: "aaa",
      phoneNumber: "08123456789",
      lineId: "aaa",
      email: "a@a.com",
    },
  ],
  communityDetail: {
    name: "วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ",
    address: "address",
    postcode: "12345",
    province: {
      id: 1,
      title: "กรุงเทพมหานคร",
    },
    district: { id: 1, title: "Test1" },
    subdistrict: { id: 1, title: "Test1" },
  },
  detail:
    "สัมผัสความเป็นชนบท เดินตามรอยวิถีวัฒนธรรมกับชาวบ้านลวงเหนือ (ไทลื้อ) ชุมชนที่โดดเด่นทางด้านวัฒนธรรม สืบเชื้อสายมาจากบรรพบุรุษที่อพยพหนีภัยสงครามมาจากแถบพื้นที่สิบสองปันนา (มณฑลหนึ่งของจีนในปัจจุบัน) ย้ายมาตั้งถิ่นฐานในที่แห่งนี้มานับร้อยปี โดยยังคงภูมิปัญญา วัฒนธรรม ภาษา และ วิถีชีวิต อันเป็นเอกลักษณ์ที่ถูกสืบทอดมาอย่างสมบูรณ์ ชาวบ้านในชุมชนมีวัดศรีมุงเมือง เป็นศูนย์รวมจิตใจ รวมความหลายหลากผสมสานกันจนเป็นอัตลักษณะแบบเฉพาะไทลื้อ และสิ่งที่นักท่องเที่ยวที่ไปเยือนจะพลาดไม่ได้คือ ข้าวแคบ ที่ไม่ว่าจะปิ้งหรือทอด ก็อร่อยไม่รู้ลืม",
  activity: {
    activities: [
      "วัดศรีมุงเมือง",
      "ศูนย์การเรียนรู้ภูมิปัญญาไตลื้อบ้านใบบุญ",
      "ทุ่งนาไตใต้ฟ้าเมืองลวง",
      "เฮือนหอมยาท้องนางาม",
      "เฮือนหอมยาท้องนางาม",
      "เฮือนข้าวแคบป้าผัน",
      "เฮือนปอกระดาษสา",
      "บ้านสวนพอเพียงทรัพย์ทองศรี",
    ],
    tourismProducts: ["เสื้อยัดย้อม", "เทียนหอม"],
    foodMenus: ["หมีก๊กใส่ตูน", "ผัดไทยไตลื้อ", "น้ำพริกน้ำปู๋", "ผักกาดส้ม", "จอผักกาด", "คั่วขนุน", "คั่วจี้น"],
    standardsOrAwards: [
      "มาตรฐาน SHA, มาตรฐานโฮมสเตย์",
      "CBT Thailand Standard : มาตรฐานการท่องเที่ยวโดยชุมชน",
      "รางวัลกินรี",
    ],
    activityPrice: 1000,
    lifestyle: "ชาวบ้านส่วนใหญ่ประกอบอาชีพเกษตรกรรม",
    language: "ชาวชุมชนไตลื้อเมืองลวงเหนือใช้ภาษาเหนือในการสื่อสาร",
    season: { id: "1", name: "Test1", value: "test1" },
    visitorCapacityMinMax: 100,
    communityHighlights: "Highlight",
    organizationalUnit: "AAA Department",
  },
  travelBookingContacts: [
    {
      firstName: "aaa",
      lastName: "aaa",
      phoneNumber: "08123456789",
    },
  ],
  presentation: {
    hasYoutube: true,
    hasFacebook: false,
    hasInstagram: false,
    hasTiktok: false,
    hasDocument: false,
    hasOther: false,
    youtubeLink: "https://www.youtube.com/watch?v=G0m_uNaSres",
    facebookLink: "",
    instagramLink: "",
    tiktokLink: "",
    documents: [],
    other: "Other",
  },
  tags: ["#เชิงประวัติศาสตร์", "#เชิงวัฒนธรรม", "#เชิงเกษตรกรรม"],
  homestay: {
    isAvailable: true,
    number: 3,
    maxCapacity: 10,
  },
  touristVehicle: {
    isAvailable: true,
    boat: {
      isAvailable: true,
      number: 3,
      maxCapacity: 10,
    },
    motorcycle: {
      isAvailable: true,
      number: 3,
      maxCapacity: 10,
    },
    car: {
      isAvailable: true,
      number: 3,
      maxCapacity: 10,
    },
    van: {
      isAvailable: true,
      number: 3,
      maxCapacity: 10,
    },
    tourBus: {
      isAvailable: true,
      number: 3,
      maxCapacity: 10,
    },
    other: {
      isAvailable: true,
      text: "Other",
      maxCapacity: 10,
    },
  },
  parking: {
    isAvailable: true,
    number: 3,
  },
  restroom: {
    isAvailable: true,
    number: 3,
  },
  meetingRoom: {
    isAvailable: true,
    number: 3,
  },
  guide: {
    isAvailable: true,
    number: 3,
  },
  facilitiesForDisability: {
    isAvailable: true,
    text: "Facilities For Disability",
  },
  hasWifi: true,
  hasElectricity: true,
  hasTapWater: true,
  hasSouvenirShop: true,
  hasConvenienceStore: true,
  hasCctv: true,
  dataDissemination: true,
  consent: true,
  isRecommended: true,
  createdAt: DateTime.now(),
  touristTargetGroups: [],
  touristTravelRegions: [],
  touristTravelCountries: [],
};

const mockCommunityWithNegotiationReady: MockCommunity = {
  ...sampleData,
  id: 1,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (พร้อมเจรจา)"),
  negotiationStatus: MockNegotiationStatus.Ready,
};

const mockCommunityWithNegotiationAppointmentRequested: MockCommunity = {
  ...sampleData,
  id: 2,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (ขอเจรจา)"),
  negotiationStatus: MockNegotiationStatus.AppointmentRequested,
  entrepreneur: {
    name: "ธุรกิจท่องเที่ยว",
  },
};

const mockCommunityWithNegotiationAppointmentDatetimeRequested = {
  ...sampleData,
  id: 3,
  communityDetail: getCommunityDetailWithName(
    "วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (ขอเปลี่ยนเวลา)"
  ),
  negotiationStatus: MockNegotiationStatus.AppointmentDatetimeRequested,
  entrepreneur: {
    name: "ธุรกิจท่องเที่ยว",
  },
};

const mockCommunityWithNegotiationEntrepreneurRejected = {
  ...sampleData,
  id: 4,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (เสร็จสิ้น)"),
  negotiationStatus: MockNegotiationStatus.EntrepreneurRejected,
  rejectNegitiationReason: "ขอปฏิเสธทำตามคำสั่งครับท่าน",
  entrepreneur: {
    name: "ธุรกิจท่องเที่ยว",
  },
};

const mockCommunityWithNegotiationCommunityRejected = {
  ...sampleData,
  id: 5,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (เสร็จสิ้น)"),
  negotiationStatus: MockNegotiationStatus.CommunityRejected,
  entrepreneur: {
    name: "ธุรกิจท่องเที่ยว",
  },
};

const mockCommunityWithNegotiationCompleted = {
  ...sampleData,
  id: 6,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (เสร็จสิ้น)"),
  negotiationStatus: MockNegotiationStatus.Completed,
  entrepreneur: {
    name: "ธุรกิจท่องเที่ยว",
  },
};

const mockCommunityWithActivityApprove = {
  ...sampleData,
  id: 7,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (อนุมัติ)"),
  status: MockActivityStatus.Approved,
};

const mockCommunityWithActivityWaitingForApprove = {
  ...sampleData,
  id: 8,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (รอการอนุมัติ)"),
  status: MockActivityStatus.WaitingForApprove,
};

const mockCommunityWithActivityRejected = {
  ...sampleData,
  id: 9,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (ถูกปฏิเสธ)"),
  status: MockActivityStatus.Rejected,
  rejectReason: "ขอปฏิเสธทำตามคำสั่งครับท่าน",
};

const mockCommunityWithActivityDraft = {
  ...sampleData,
  id: 10,
  communityDetail: getCommunityDetailWithName("วิสาหกิจชุมชนกลุ่มท่องเที่ยวโดยชุมชนไตลื้อเมืองลวงเหนือ (แบบร่าง)"),
  status: MockActivityStatus.Draft,
};

function getCommunityDetailWithName(name: string) {
  return {
    name: name,
    address: "address",
    postcode: "12345",
    province: {
      id: 1,
      title: "กรุงเทพมหานคร",
    },
    district: { id: 1, title: "Test1" },
    subdistrict: { id: 1, title: "Test1" },
  };
}

export const mockCommunities = [
  mockCommunityWithNegotiationReady,
  mockCommunityWithNegotiationAppointmentRequested,
  mockCommunityWithNegotiationAppointmentDatetimeRequested,
  mockCommunityWithNegotiationEntrepreneurRejected,
  mockCommunityWithNegotiationCommunityRejected,
  mockCommunityWithNegotiationCompleted,
  mockCommunityWithActivityApprove,
  mockCommunityWithActivityWaitingForApprove,
  mockCommunityWithActivityRejected,
  mockCommunityWithActivityDraft,
];
