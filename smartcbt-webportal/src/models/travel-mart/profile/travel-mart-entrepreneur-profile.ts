export interface MockProfileEntrepreneur {
  id: number;
  companyName: string;
  companyLicenseNumber: string;
  type: string;
  coordinator: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    line: string;
  };
  website: string;
  facebook: string;
  instagram: string;
  tikTok: string;
  activities: string[];
  address: {
    lat: number;
    long: number;
    addressDetail?: string;
    district: string;
    subdistrict: string;
    province: string;
    soi?: string;
    no?: string;
    villageName?: string;
    moo?: string;
    road?: string;
    postCode: string;
  };
}

export const mockEntrepreneur: MockProfileEntrepreneur = {
  id: 0,
  type: "บริษัทจัดนำเที่ยว (DMC)",
  companyLicenseNumber: "Something Number",
  companyName: "ITC Travel",
  facebook: "ITC Travel Facebook",
  website: "https://www.itc.travel/contact",
  instagram: "ITC Travel Instagram",
  tikTok: "ITC Travel TikTok",
  coordinator: {
    firstName: "คุณหนึ่ง",
    lastName: "เทส",
    email: "inquiry@itcbangkok.com",
    line: "@ITCTravel",
    phoneNumber: "028320777",
  },
  address: {
    lat: 10.222,
    long: 10.222,
    no: "50/980",
    moo: "9",
    district: "เขตปากเกร็ด",
    subdistrict: "แขวงบางพูด",
    province: "นนทบุรี",
    postCode: "11120",
  },
  activities: [
    "กิจกรรม CSR ภายในชุมชน",
    "สนับสนุนให้พนักงานลดการใช้พลาสติก และเก็บรวมรวมพลาสติกเพื่อไปบริจาคให้แก่หน่วยงาน Precious Plastic Bangkok",
  ],
};
