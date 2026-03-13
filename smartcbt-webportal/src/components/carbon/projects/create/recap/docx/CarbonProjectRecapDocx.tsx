import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { bufferFileUtils } from "@/utils/cms/cms-api-adapter";
import { BorderStyle, Document, ImageRun, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
import { saveAs } from "file-saver";
import { isEmpty } from "lodash";

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section

const buildTable = (
  data: CarbonSummaryData,
  summaryImage: string,
  photoCover: Uint8Array | null,
  accommodation: (Uint8Array | null)[] | null,
  foods: (Uint8Array | null)[] | null,
  travels: (Uint8Array | null)[] | null,
  wastes: (Uint8Array | null)[] | null,
  documents: (Uint8Array | null)[] | null
) => {
  const noBorder = {
    top: { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
  };

  const generalInformation = [
    new Paragraph("1. ข้อมูลทั่วไป"),
    new Table({
      columnWidths: [3505, 5505],
      borders: {
        ...noBorder,
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("ชื่อโปรแกรมท่องเที่ยว")],
            }),
            new TableCell({
              children: [new Paragraph(data.name)],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("ชื่อบริษัท")],
            }),
            new TableCell({
              children: [new Paragraph(data.company)],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("จำนวนนักท่องเที่ยวที่รองรับได้ (คน)")],
            }),
            new TableCell({
              children: [new Paragraph(data.numberOfTourist.toFixed(0))],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("ขอบเขตของการประเมิน")],
            }),
            new TableCell({
              children: [new Paragraph(data.scope?.title)],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("หน่วยการทำงาน")],
            }),
            new TableCell({
              children: [new Paragraph(data.unit)],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("วันที่ขอขึ้นทะเบียน")],
            }),
            new TableCell({
              children: [new Paragraph(data.registrationDate)],
            }),
          ],
        }),
      ],
    }),
    new Paragraph(""),
    new Paragraph("รายละเอียดโปรแกรมท่องเที่ยว"),
    new Paragraph(""),
    new Table({
      columnWidths: [1500, 2500, 2500, 2500],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("กิจกรรมที่")],
            }),
            new TableCell({
              children: [new Paragraph("ชื่อกิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ระยะเวลากิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ประเภท PCR")],
            }),
          ],
        }),
        ...data.activities.flatMap((activity) => {
          return [
            new TableRow({ children: [new TableCell({ children: [new Paragraph(activity.date)], columnSpan: 4 })] }),
            ...activity.activities.map((subActivity, index) => {
              return new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(subActivity.details)] }),
                  new TableCell({ children: [new Paragraph(subActivity.time)] }),
                  new TableCell({ children: [new Paragraph(subActivity.pcrs)] }),
                ],
              });
            }),
          ];
        }),
      ],
    }),
  ];
  const dataCollectionScope = [
    new Paragraph("2. ขอบเขตการเก็บข้อมูล"),
    new Table({
      columnWidths: [1500, 2500, 2000, 2000, 1500, 1500],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("กิจกรรมที่")],
            }),
            new TableCell({
              children: [new Paragraph("ชื่อกิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ประเภท EF")],
            }),
            new TableCell({
              children: [new Paragraph("ระยะทาง (กม.)")],
            }),
            new TableCell({
              children: [new Paragraph("ค่า EF (kgCO2eq)")],
            }),
            new TableCell({
              children: [new Paragraph("ปริมาณ CFP (kgCO2eq)")],
            }),
          ],
        }),
        ...data.dataCollectionScope.flatMap((collectionScope) => {
          return [
            new TableRow({
              children: [new TableCell({ children: [new Paragraph(collectionScope.date)], columnSpan: 6 })],
            }),
            ...collectionScope.activities.flatMap((activity) => {
              return [
                new TableRow({
                  children: [new TableCell({ children: [new Paragraph(activity.details.toString())], columnSpan: 6 })],
                }),
                ...activity.carbonFootprintActivities.map((subActivity, index) => {
                  return new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                      new TableCell({ children: [new Paragraph(subActivity.name ?? "-")] }),
                      new TableCell({ children: [new Paragraph(subActivity.emissionProxy ?? "-")] }),
                      new TableCell({ children: [new Paragraph((subActivity.multiplier ?? 0).toFixed(0))] }),
                      new TableCell({ children: [new Paragraph((subActivity.emissionFactorValue ?? 0).toFixed(3))] }),
                      new TableCell({
                        children: [new Paragraph(subActivity.ef.toFixed(4))],
                      }),
                    ],
                  });
                }),
              ];
            }),
          ];
        }),
      ],
    }),
  ];
  const transportation = [
    new Paragraph("3. การเดินทาง"),
    new Table({
      columnWidths: [1500, 2500, 2000, 2000, 1500, 1500],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("กิจกรรมที่")],
            }),
            new TableCell({
              children: [new Paragraph("ชื่อกิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ประเภท EF")],
            }),
            new TableCell({
              children: [new Paragraph("ระยะทาง (กม.)")],
            }),
            new TableCell({
              children: [new Paragraph("ค่า EF (kgCO2eq)")],
            }),
            new TableCell({
              children: [new Paragraph("ปริมาณ CFP (kgCO2eq)")],
            }),
          ],
        }),
        ...data.transportations.flatMap((activity) => {
          return [
            new TableRow({ children: [new TableCell({ children: [new Paragraph(activity.date)], columnSpan: 6 })] }),
            ...activity.activities.map((subActivity, index) => {
              return new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(subActivity.name ?? "-")] }),
                  new TableCell({ children: [new Paragraph(subActivity.emissionProxy ?? "-")] }),
                  new TableCell({ children: [new Paragraph((subActivity.multiplier ?? 0).toFixed(0))] }),
                  new TableCell({ children: [new Paragraph((subActivity.emissionFactorValue ?? 0).toFixed(3))] }),
                  new TableCell({
                    children: [new Paragraph(subActivity.ef.toFixed(4))],
                  }),
                ],
              });
            }),
          ];
        }),
      ],
    }),
  ];
  const accomodations = [
    new Paragraph("4. ที่พักแรม/กิจกรรม"),
    new Table({
      columnWidths: [1500, 2500, 2000, 2000, 1500, 1500],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("กิจกรรมที่")],
            }),
            new TableCell({
              children: [new Paragraph("ชื่อกิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ประเภท EF")],
            }),
            new TableCell({
              children: [new Paragraph("จำนวนคืนที่เข้าพัก (คน)")],
            }),
            new TableCell({
              children: [new Paragraph("ค่า EF (kgCO2eq)")],
            }),
            new TableCell({
              children: [new Paragraph("ปริมาณ CFP (kgCO2eq)")],
            }),
          ],
        }),
        ...data.accomodations.flatMap((activity) => {
          return [
            new TableRow({ children: [new TableCell({ children: [new Paragraph(activity.date)], columnSpan: 6 })] }),
            ...activity.activities.map((subActivity, index) => {
              return new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(subActivity.name ?? "-")] }),
                  new TableCell({ children: [new Paragraph(subActivity.emissionProxy ?? "-")] }),
                  new TableCell({ children: [new Paragraph((subActivity.multiplier ?? 0).toFixed(0))] }),
                  new TableCell({ children: [new Paragraph((subActivity.emissionFactorValue ?? 0).toFixed(3))] }),
                  new TableCell({
                    children: [new Paragraph(subActivity.ef.toFixed(4))],
                  }),
                ],
              });
            }),
          ];
        }),
      ],
    }),
  ];
  const food = [
    new Paragraph("5. อาหาร"),
    new Table({
      columnWidths: [1500, 2500, 2000, 2000, 1500, 1500],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("กิจกรรมที่")],
            }),
            new TableCell({
              children: [new Paragraph("ชื่อกิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ประเภท EF")],
            }),
            new TableCell({
              children: [new Paragraph("จำนวนมื้อที่รับประทาน (ต่อคน)")],
            }),
            new TableCell({
              children: [new Paragraph("ค่า EF (kgCO2eq)")],
            }),
            new TableCell({
              children: [new Paragraph("ปริมาณ CFP (kgCO2eq)")],
            }),
          ],
        }),
        ...data.foods.flatMap((activity) => {
          return [
            new TableRow({ children: [new TableCell({ children: [new Paragraph(activity.date)], columnSpan: 6 })] }),
            ...activity.activities.map((subActivity, index) => {
              return new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(subActivity.name ?? "-")] }),
                  new TableCell({ children: [new Paragraph(subActivity.emissionProxy ?? "-")] }),
                  new TableCell({ children: [new Paragraph((subActivity.multiplier ?? 0).toFixed(0))] }),
                  new TableCell({ children: [new Paragraph((subActivity.emissionFactorValue ?? 0).toFixed(3))] }),
                  new TableCell({
                    children: [new Paragraph(subActivity.ef.toFixed(4))],
                  }),
                ],
              });
            }),
          ];
        }),
      ],
    }),
  ];

  const waste = [
    new Paragraph("6. ของเสีย"),
    new Table({
      columnWidths: [1500, 2500, 2000, 2000, 1500, 1500],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("กิจกรรมที่")],
            }),
            new TableCell({
              children: [new Paragraph("ชื่อกิจกรรม")],
            }),
            new TableCell({
              children: [new Paragraph("ประเภท EF")],
            }),
            new TableCell({
              children: [new Paragraph("ของเสีย")],
            }),
            new TableCell({
              children: [new Paragraph("ค่า EF (kgCO2eq)")],
            }),
            new TableCell({
              children: [new Paragraph("ปริมาณ CFP (kgCO2eq)")],
            }),
          ],
        }),
        ...data.wastes.flatMap((activity) => {
          return [
            new TableRow({ children: [new TableCell({ children: [new Paragraph(activity.date)], columnSpan: 6 })] }),
            ...activity.activities.map((subActivity, index) => {
              return new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(subActivity.name ?? "-")] }),
                  new TableCell({ children: [new Paragraph(subActivity.emissionProxy ?? "-")] }),
                  new TableCell({ children: [new Paragraph((subActivity.multiplier ?? 0).toFixed(2))] }),
                  new TableCell({ children: [new Paragraph((subActivity.emissionFactorValue ?? 0).toFixed(3))] }),
                  new TableCell({
                    children: [new Paragraph(subActivity.ef.toFixed(4))],
                  }),
                ],
              });
            }),
          ];
        }),
      ],
    }),
  ];

  const summary = [
    new Paragraph("7. ผลรวม Carbon Footprint"),
    new Paragraph({
      children: [
        new ImageRun({
          data: summaryImage,
          transformation: {
            width: 600,
            height: 600,
          },
        }),
      ],
    }),
  ];

  const photoCoverTable = [
    new Paragraph("รูปหน้าปก"),
    photoCover
      ? new Paragraph({
          children: [
            new ImageRun({
              data: photoCover,
              transformation: {
                width: 300,
                height: 300,
              },
            }),
          ],
        })
      : new Paragraph(""),
  ];

  const travelTable = [
    new Paragraph("ภาพถ่ายการเดินทาง"),
    ...(travels || []).map((photo) => {
      if (!photo) return new Paragraph("");
      return new Paragraph({
        children: [
          new ImageRun({
            data: photo,
            transformation: {
              width: 300,
              height: 300,
            },
          }),
        ],
      });
    }),
  ];

  const accommodationTable = [
    new Paragraph("ภาพถ่ายที่พักแรม"),
    ...(accommodation || []).map((photo) => {
      if (!photo) return new Paragraph("");
      return new Paragraph({
        children: [
          new ImageRun({
            data: photo,
            transformation: {
              width: 300,
              height: 300,
            },
          }),
        ],
      });
    }),
  ];

  const foodTable = [
    new Paragraph("ภาพถ่ายอาหาร"),
    ...(foods || []).map((photo) => {
      if (!photo) return new Paragraph("");
      return new Paragraph({
        children: [
          new ImageRun({
            data: photo,
            transformation: {
              width: 300,
              height: 300,
            },
          }),
        ],
      });
    }),
  ];

  const wasteTable = [
    new Paragraph("ภาพถ่ายของเสีย"),
    ...(wastes || []).map((photo) => {
      if (!photo) return new Paragraph("");
      return new Paragraph({
        children: [
          new ImageRun({
            data: photo,
            transformation: {
              width: 300,
              height: 300,
            },
          }),
        ],
      });
    }),
  ];

  const documentTable = [
    new Paragraph("ภาพถ่ายเอกสารประชาสัมพันธ์ของทริป"),
    ...(documents || []).map((photo) => {
      if (!photo) return new Paragraph("");
      return new Paragraph({
        children: [
          new ImageRun({
            data: photo,
            transformation: {
              width: 300,
              height: 300,
            },
          }),
        ],
      });
    }),
  ];

  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph("สรุปรายละเอียดโปรแกรมท่องเที่ยว"),
          new Paragraph(""),
          ...generalInformation,
          new Paragraph(""),
          ...dataCollectionScope,
          new Paragraph(""),
          ...transportation,
          new Paragraph(""),
          ...accomodations,
          new Paragraph(""),
          ...food,
          new Paragraph(""),
          ...waste,
          new Paragraph(""),
          ...summary,
          new Paragraph("8. หลักฐานภาพถ่าย"),
          ...photoCoverTable,
          new Paragraph(""),
          ...travelTable,
          new Paragraph(""),
          ...accommodationTable,
          new Paragraph(""),
          ...foodTable,
          new Paragraph(""),
          ...wasteTable,
          new Paragraph(""),
          ...documentTable,
        ],
      },
    ],
  });
};

export const generateDocxRecap = async (data: CarbonSummaryData, summaryImage: string) => {
  const { photos } = data;
  const photoCover = photos.cover ? await bufferFileUtils((photos.cover as { url: string }).url) : null;
  const accommodation = !isEmpty(photos.accommodation)
    ? await Promise.all(
        (
          photos.accommodation as {
            url: string;
          }[]
        ).map((photo: { url: string }) => bufferFileUtils(photo.url))
      )
    : null;
  const foods = !isEmpty(photos.foods)
    ? await Promise.all(
        (
          photos.foods as {
            url: string;
          }[]
        ).map((photo: { url: string }) => bufferFileUtils(photo.url))
      )
    : null;
  const travels = !isEmpty(photos.travel)
    ? await Promise.all(
        (
          photos.travel as {
            url: string;
          }[]
        ).map((photo: { url: string }) => bufferFileUtils(photo.url))
      )
    : null;
  const wastes = !isEmpty(photos.wastes)
    ? await Promise.all(
        (
          photos.wastes as {
            url: string;
          }[]
        ).map((photo: { url: string }) => bufferFileUtils(photo.url))
      )
    : null;
  const documents = !isEmpty(photos.documents)
    ? await Promise.all(
        (
          photos.documents as {
            url: string;
          }[]
        ).map((photo: { url: string }) => bufferFileUtils(photo.url))
      )
    : null;

  const doc = buildTable(data, summaryImage, photoCover, accommodation, foods, travels, wastes, documents);

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${data.name}-${data.company}-${data.registrationDate}.docx`);
  });
};
