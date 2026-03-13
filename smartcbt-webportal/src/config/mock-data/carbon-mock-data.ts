import { MarkerItem } from "@/components/carbon/overview/CarbonFootprintMap";

const mockProvinceMarkers: MarkerItem[] = [
  {
    name: "กรุงเทพมหานคร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.7563, lng: 100.5018 }, // Bangkok
    key: `lat:13.7563-lng:100.5018`,
  },
  {
    name: "เชียงใหม่",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 18.7883, lng: 98.9847 }, // Chiang Mai
    key: `lat:18.7883-lng:98.9847`,
  },
  {
    name: "ขอนแก่น",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.4395, lng: 102.8232 }, // Khon Kaen
    key: `lat:16.4395-lng:102.8232`,
  },
  {
    name: "ราชบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.5405, lng: 99.8103 }, // Ratchaburi
    key: `lat:13.5405-lng:99.8103`,
  },
  {
    name: "ภูเก็ต",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 7.8804, lng: 98.3923 }, // Phuket
    key: `lat:7.8804-lng:98.3923`,
  },
  {
    name: "สงขลา",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 7.1848, lng: 100.5955 }, // Songkhla
    key: `lat:7.1848-lng:100.5955`,
  },
  {
    name: "นครราชสีมา",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.2082, lng: 104.8703 }, // Nakhon Ratchasima
    key: `lat:15.2082-lng:104.8703`,
  },
  {
    name: "นครสวรรค์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.6934, lng: 100.1184 }, // Nakhon Sawan
    key: `lat:15.6934-lng:100.1184`,
  },
  {
    name: "ชลบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.3618, lng: 100.9847 }, // Chonburi
    key: `lat:13.3618-lng:100.9847`,
  },
  {
    name: "กาญจนบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.0253, lng: 99.5293 }, // Kanchanaburi
    key: `lat:14.0253-lng:99.5293`,
  },
  {
    name: "อุดรธานี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 17.385, lng: 102.815 }, // Udon Thani
    key: `lat:17.3850-lng:102.8150`,
  },
  {
    name: "นนทบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.8591, lng: 100.5213 }, // Nonthaburi
    key: `lat:13.8591-lng:100.5213`,
  },
  {
    name: "ยะลา",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 6.5393, lng: 101.2802 }, // Yala
    key: `lat:6.5393-lng:101.2802`,
  },
  {
    name: "พังงา",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 8.45, lng: 98.525 }, // Phang Nga
    key: `lat:8.4500-lng:98.5250`,
  },
  {
    name: "สระแก้ว",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.8196, lng: 102.0646 }, // Sa Kaeo
    key: `lat:13.8196-lng:102.0646`,
  },
  {
    name: "สุรินทร์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.8831, lng: 103.4938 }, // Surin
    key: `lat:14.8831-lng:103.4938`,
  },
  {
    name: "เลย",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 17.4846, lng: 101.7319 }, // Loei
    key: `lat:17.4846-lng:101.7319`,
  },
  {
    name: "ตรัง",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 7.5565, lng: 99.6114 }, // Trang
    key: `lat:7.5565-lng:99.6114`,
  },
  {
    name: "เพชรบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.0913, lng: 99.9427 }, // Phetchaburi
    key: `lat:13.0913-lng:99.9427`,
  },
  {
    name: "อุบลราชธานี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.228, lng: 104.8563 }, // Ubon Ratchathani
    key: `lat:15.2280-lng:104.8563`,
  },
  {
    name: "สมุทรปราการ",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.5991, lng: 100.5999 }, // Samut Prakan
    key: `lat:13.5991-lng:100.5999`,
  },
  {
    name: "นครศรีธรรมราช",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 8.4304, lng: 99.9647 }, // Nakhon Si Thammarat
    key: `lat:8.4304-lng:99.9647`,
  },
  {
    name: "ยโสธร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.7966, lng: 104.1472 }, // Yasothon
    key: `lat:15.7966-lng:104.1472`,
  },
  {
    name: "มุกดาหาร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.5441, lng: 104.7155 }, // Mukdahan
    key: `lat:16.5441-lng:104.7155`,
  },
  {
    name: "ระยอง",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 12.6786, lng: 101.278 }, // Rayong
    key: `lat:12.6786-lng:101.2780`,
  },
  {
    name: "พะเยา",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 19.1613, lng: 99.9076 }, // Phayao
    key: `lat:19.1613-lng:99.9076`,
  },
  {
    name: "สระบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.5419, lng: 100.2746 }, // Saraburi
    key: `lat:13.5419-lng:100.2746`,
  },
  {
    name: "เพชรบูรณ์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.4256, lng: 101.1591 }, // Phetchabun
    key: `lat:16.4256-lng:101.1591`,
  },
  {
    name: "สุพรรณบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.4745, lng: 100.1178 }, // Suphan Buri
    key: `lat:14.4745-lng:100.1178`,
  },
  {
    name: "ศรีสะเกษ",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.1184, lng: 104.3295 }, // Si Sa Ket
    key: `lat:15.1184-lng:104.3295`,
  },
  {
    name: "สิงห์บุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.8888, lng: 100.4007 }, // Sing Buri
    key: `lat:14.8888-lng:100.4007`,
  },
  {
    name: "นครนายก",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.2036, lng: 101.215 }, // Nakhon Nayok
    key: `lat:14.2036-lng:101.2150`,
  },
  {
    name: "สุโขทัย",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 17.0055, lng: 99.8231 }, // Sukhothai
    key: `lat:17.0055-lng:99.8231`,
  },
  {
    name: "ร้อยเอ็ด",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.0538, lng: 103.6529 }, // Roi Et
    key: `lat:16.0538-lng:103.6529`,
  },
  {
    name: "อำนาจเจริญ",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.8621, lng: 104.625 }, // Amnat Charoen
    key: `lat:15.8621-lng:104.6250`,
  },
  {
    name: "ลพบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.8019, lng: 100.6185 }, // Lopburi
    key: `lat:14.8019-lng:100.6185`,
  },
  {
    name: "ตราด",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 12.2427, lng: 102.5176 }, // Trat
    key: `lat:12.2427-lng:102.5176`,
  },
  {
    name: "ชัยนาท",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.1903, lng: 100.1296 }, // Chai Nat
    key: `lat:15.1903-lng:100.1296`,
  },
  {
    name: "นครพนม",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 17.4109, lng: 104.724 }, // Nakhon Phanom
    key: `lat:17.4109-lng:104.7240`,
  },
  {
    name: "สมุทรสาคร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.5471, lng: 100.2745 }, // Samut Sakhon
    key: `lat:13.5471-lng:100.2745`,
  },
  {
    name: "แพร่",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 18.1496, lng: 100.1401 }, // Phrae
    key: `lat:18.1496-lng:100.1401`,
  },
  {
    name: "นราธิวาส",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 6.4243, lng: 101.8239 }, // Narathiwat
    key: `lat:6.4243-lng:101.8239`,
  },
  {
    name: "นครศรีบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 8.428, lng: 99.9635 }, // Nakhon Si Buri
    key: `lat:8.4280-lng:99.9635`,
  },
  {
    name: "สมุทรสงคราม",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.4123, lng: 100.0018 }, // Samut Songkhram
    key: `lat:13.4123-lng:100.0018`,
  },
  {
    name: "เพชรบูรณ์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.4161, lng: 101.1597 }, // Phetchabun
    key: `lat:16.4161-lng:101.1597`,
  },
  {
    name: "พิจิตร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.4557, lng: 100.1258 }, // Phichit
    key: `lat:16.4557-lng:100.1258`,
  },
  {
    name: "ตาก",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.8835, lng: 99.1257 }, // Tak
    key: `lat:16.8835-lng:99.1257`,
  },
  {
    name: "กำแพงเพชร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.4826, lng: 99.5222 }, // Kamphaeng Phet
    key: `lat:16.4826-lng:99.5222`,
  },
  {
    name: "มหาสารคาม",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.1584, lng: 103.2843 }, // Maha Sarakham
    key: `lat:16.1584-lng:103.2843`,
  },
  {
    name: "น่าน",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 18.7853, lng: 100.7737 }, // Nan
    key: `lat:18.7853-lng:100.7737`,
  },
  {
    name: "บุรีรัมย์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.9877, lng: 103.1036 }, // Buri Ram
    key: `lat:14.9877-lng:103.1036`,
  },
  {
    name: "สุราษฎร์ธานี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 9.1383, lng: 99.3218 }, // Surat Thani
    key: `lat:9.1383-lng:99.3218`,
  },
  {
    name: "กาฬสินธุ์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 16.4339, lng: 103.5062 }, // Kalasin
    key: `lat:16.4339-lng:103.5062`,
  },
  {
    name: "ลำปาง",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 18.2744, lng: 99.5047 }, // Lampang
    key: `lat:18.2744-lng:99.5047`,
  },
  {
    name: "อ่างทอง",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.6041, lng: 100.4486 }, // Ang Thong
    key: `lat:14.6041-lng:100.4486`,
  },
  {
    name: "อุตรดิตถ์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 17.6599, lng: 100.0987 }, // Uttaradit
    key: `lat:17.6599-lng:100.0987`,
  },
  {
    name: "อุทัยธานี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 15.3817, lng: 100.0241 }, // Uthai Thani
    key: `lat:15.3817-lng:100.0241`,
  },
  {
    name: "ประจวบคีรีขันธ์",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 11.8453, lng: 99.784 }, // Prachuap Khiri Khan
    key: `lat:11.8453-lng:99.7840`,
  },
  {
    name: "ระนอง",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 9.7293, lng: 98.9743 }, // Ranong
    key: `lat:9.7293-lng:98.9743`,
  },
  {
    name: "จันทบุรี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 12.6111, lng: 102.1037 }, // Chanthaburi
    key: `lat:12.6111-lng:102.1037`,
  },
  {
    name: "ปัตตานี",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 6.8672, lng: 101.25 }, // Pattani
    key: `lat:6.8672-lng:101.2500`,
  },
  {
    name: "พระนครศรีอยุธยา",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 14.3538, lng: 100.5523 }, // Phra Nakhon Si Ayutthaya
    key: `lat:14.3538-lng:100.5523`,
  },
  {
    name: "สตูล",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 6.6245, lng: 100.4211 }, // Satun
    key: `lat:6.6245-lng:100.4211`,
  },
  {
    name: "เชียงราย",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 19.9105, lng: 99.8406 }, // Chiang Rai
    key: `lat:19.9105-lng:99.8406`,
  },
  {
    name: "แม่ฮ่องสอน",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 19.3, lng: 98.4667 }, // Mae Hong Son
    key: `lat:19.3000-lng:98.4667`,
  },
  {
    name: "นครปฐม",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 13.8176, lng: 100.0484 }, // Coordinates for Nakhon Pathom
    key: `lat:13.8176-lng:100.0484`,
  },
  {
    name: "กระบี่",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 8.0863, lng: 98.9063 }, // Coordinates for Krabi
    key: `lat:8.0863-lng:98.9063`,
  },
  {
    name: "ชุมพร",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 10.4974, lng: 99.1809 }, // Coordinates for Chumphon
    key: `lat:10.4974-lng:99.1809`,
  },
  {
    name: "พัทลุง",
    value: Math.random() * 1000,
    color: "text-smart-cbt-green",
    position: { lat: 7.6178, lng: 100.0773 }, // Coordinates for Phatthalung
    key: `lat:7.6178-lng:100.0773`,
  },
];
