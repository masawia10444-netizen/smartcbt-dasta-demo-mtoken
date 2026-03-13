"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { readFolders, readItem, readItems, uploadFiles } from "@directus/sdk";
import jsonata from "jsonata";
import * as _ from "lodash";
import { isEmpty } from "lodash";
import { Project, ProjectStrategiesItems } from "./types/project";

//ความเชื่อมโยงของโครงการนุทธศาสตร์และแผนงานเกี่ยวข้อง
export type ProjectStrategies = Collection["project_strategies"];
//ลักษณะโครงการ
export type ProjectCharacteristics = Collection["project_characteristics"];
// ประเภทโครงการ
export type ProjectTypes = Collection["project_types"];
//
export type ProjectLocations = Collection["project_locations"];
// พื้นที่ดำเนินงาน
export type DastaWorkingArea = Collection["dasta_working_area"];

//หน่วยงาน
export type Organizations = Collection["organizations"];
//sdgs
export type Sdgs = Collection["sdgs"];

//project_activities กิจกรรมภายในโครงการ
export type ProjectActivities = Collection["project_activities"];
//dasta_working_objective
export type DastaWorkingObjective = Collection["dasta_working_objective"];

export type ProjectTypeJson = {
  key: string;
  value: string;
  label: string;
};

async function fetchProjectLocations() {
  const res: ProjectLocations[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_locations", {
        fields: ["*"],
        limit: "-1",
        sort: "sort",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );
  return transformProjectLocations(res);
}

async function transformProjectLocations(communityAttractionType: ProjectLocations[]) {
  const expression = jsonata(`
  $.{
      'key': 'id',
      'title': title,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  return result;
}

async function fetchProject(id: number) {
  const res: Project = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("projects", id, {
        fields: ["*", "*.*", "*.*.*"],
      }),
      0
    )
  );
  return transformProject(res);
}

async function transformProject(communityAttractionType: Project) {
  const expression = jsonata(`
  $.{
      'has_project_strategies': has_project_strategies.project_strategies_items_id.id,
      'project_characteristic': project_characteristic.id,
      'project_type': project_type.{
            'projects_id': projects_id.id,
            'project_types_id': project_types_id.{
        'sort': sort,
        'id': id,
        'status': status,
        'title': title    
    }
          }[],
      'project_status': project_status,
      'project_locations': {
        'id': project_locations.id,
          'title': project_locations.title,
          'province': {
              'id': project_locations.province.id,
              'title': project_locations.province.title
          },
          'district':{
              'id': project_locations.district.id,
              'title': project_locations.district.title
          },
          'subdistrict':{
              'id': project_locations.subdistrict.id,
              'title': project_locations.subdistrict.title
          },
          'postalcode': project_locations.postalcode,
          'latitude': project_locations.latitude,
          'longitude': project_locations.longitude
      },
      'dasta_working_area': dasta_working_area.id,
      'project_owner': project_owner.id,
      'duration_type': duration_type = "date" ? 
      {
          "duration_type": duration_type,
          "project_start_datetime":project_start_datetime,
          "project_end_datetime":project_end_datetime
          }
     : {
          "duration_type": duration_type,
          "project_start_datetime":project_start_year,
          "project_end_datetime":project_end_year
          },
      'project_consequence_end_year': project_consequence_end_year,
      'project_budget': project_budget,
      'project_objectives': project_objectives,
      'project_activities': project_activities,
      'project_outputs': project_outputs,
      'project_outcomes': project_outcomes,
      'project_utilizers': {
    "title": project_utilizers.title,
    "province": project_utilizers.province
  },
      'project_sdgs': project_sdgs.sdgs_id.id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  return result;
}

async function fetchSdgs() {
  const res: Sdgs[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("sdgs", {
        fields: ["*"],
        limit: "-1",
        sort: "sort",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );
  return transformSdgs(res);
}

async function transformSdgs(communityAttractionType: Sdgs[]) {
  const expression = jsonata(`
  $.{
      'key': id,
      'label': title,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  const resultString = result.map((item: { key: number; label: number; value: string }) => {
    return {
      ...item,
      key: `project_sdgs_${item.key}`,
      value: String(item.value),
    };
  });
  return resultString;
}

async function fetchOrganizations(sort: string[] = ["sort"]) {
  const res: Organizations[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("organizations", {
        fields: ["*"],
        limit: "-1",
        sort,
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );
  return transformOrganizations(res);
}

async function transformOrganizations(communityAttractionType: Organizations[]) {
  const expression = jsonata(`
  $.{
      'key': id,
      'label': title,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  const resultString = result.map((item: { key: number; label: number; value: string }) => {
    return {
      ...item,
      key: `project_owner_${String(item.key)}`,
      value: String(item.value),
    };
  });
  return resultString;
}

async function fetchDastaWorkingArea() {
  const res: DastaWorkingArea[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("dasta_working_area", {
        fields: ["*", "provinces.*", "provinces.provinces_id.*", "provinces.dasta_working_area_id.*"],
        limit: "-1",
        sort: "sort",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );

  return transformDastaWorkingArea(res);
}

async function transformDastaWorkingArea(communityAttractionType: DastaWorkingArea[]) {
  const expression = jsonata(`
  $.{
      'key': id,
      'label': title,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  const resultString = result?.map((item: { key: number; label: string; value: number }) => {
    return {
      ...item,
      key: `dasta_working_area_${item.key}`,
      value: String(item.value),
    };
  });
  return resultString;
}

async function fetchProjectTypes() {
  const res: ProjectTypes[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_types", {
        fields: ["*"],
        limit: "-1",
        sort: "sort",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );

  return transformProjectTypes(res);
}

async function transformProjectTypes(communityAttractionType: ProjectTypes[]) {
  const expression = jsonata(`

  $.{
      'key': id,
      'label': title,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  const resultString = result.map((item: { key: number; label: number; value: string }) => {
    return {
      ...item,
      key: `project_type_${item.key}`,
      value: String(item.value),
    };
  });
  return resultString;
}

async function fetchProjectCharacteristics() {
  const res: ProjectCharacteristics[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_characteristics", {
        fields: ["*"],
        limit: "-1",
        sort: "sort",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );

  return transformProjectCharacteristics(res);
}

async function transformProjectCharacteristics(communityAttractionType: ProjectCharacteristics[]) {
  const expression = jsonata(`
  $.{
      'key': id,
      'label': title,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  const resultString = result.map((item: { key: number; label: number; value: string; text_field?: string }) => {
    if (String(item.label).indexOf("อื่นๆ") > -1) {
      item.text_field = "project_characteristic_other";
    }
    return {
      ...item,
      key:
        String(item.label).indexOf("อื่นๆ") > -1
          ? `project_characteristic_${item.key}-other`
          : `project_characteristic_${item.key}`,
      value: String(item.value),
    };
  });
  return resultString;
}

async function fetchProjectStrategies() {
  const res: ProjectStrategies[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_strategies", {
        fields: ["*", "strategies_items.*"],
        limit: "-1",
        sort: "sort",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );

  return transformProjectStrategies(
    res.map((item) => {
      const strategiesItems = item.strategies_items
        .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
        .filter((item: { status: string }) => item.status === "published");
      return {
        ...item,
        strategies_items: strategiesItems,
      };
    })
  );
}

async function fetchProjectDastaWorkingObjective() {
  const res: DastaWorkingObjective[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("dasta_working_objective", {
        fields: ["*"],
        limit: "-1",
        filter: {
          status: {
            _eq: "published",
          },
        },
      }),
      0
    )
  );

  return transformProjectDastaWorkingObjective(res);
}

async function transformProjectDastaWorkingObjective(communityAttractionType: DastaWorkingObjective[]) {
  const expression = jsonata(`
  $.{
      'key': 'dasta_working_objective_id',
      'label': title,
      'description': condition,
      'value': id
    }`);

  const result = await expression.evaluate(communityAttractionType);
  const resultString = result.map((item: { key: string; label: string; value: string; description: string }) => {
    return {
      ...item,
      key: `dasta_working_objective_${item.value}`,
      value: String(item.value),
      description: item.description !== null ? item.description : "",
    };
  });
  return resultString;
}

async function transformProjectStrategies(communityAttractionType: ProjectStrategies[]) {
  const type = [
    {
      key: 1,
      value: "radio",
    },
    {
      key: 2,
      value: "radio",
    },
    {
      key: 3,
      value: "checkbox",
    },
    {
      key: 4,
      value: "checkbox",
    },
    {
      key: 5,
      value: "radioWithoutRequired",
    },
    {
      key: 6,
      value: "checkboxWithoutRequired",
    },
    {
      key: 7,
      value: "checkbox",
    },
    {
      key: 9,
      value: "radioWithoutRequired",
    },
  ];
  const subKeyList = [
    {
      id: 1,
      value: "options",
      typeValue: "type",
    },
    {
      id: 2,
      value: "subQuestions",
      typeValue: "subQuestionType",
    },
    {
      id: 3,
      value: "options",
      typeValue: "type",
    },
    {
      id: 4,
      value: "options",
      typeValue: "type",
    },
    {
      id: 5,
      value: "options",
      typeValue: "type",
    },
    {
      id: 6,
      value: "options",
      typeValue: "type",
    },
    {
      id: 7,
      value: "options",
      typeValue: "type",
    },
    {
      id: 9,
      value: "options",
      typeValue: "type",
    },
  ];
  const data = [
    {
      key: "05",
      label: "05 ประเด็นการท่องเที่ยว",
    },
    {
      key: "09",
      label: "09 ประเด็นเขตเศรษกิจพิเศษ",
    },
    // {
    //   key: "16",
    //   label: "16 ประเด็นเศรษฐกิจฐานราก",
    // },
  ];

  const result = communityAttractionType.map((item) => {
    const mappedItem: { [key: string]: string | { key: string; label: string; value: string } } = {};

    subKeyList.find((subKey: { id: number; value: string; typeValue: string }) => {
      const options = item.strategies_items.map((item: ProjectStrategiesItems) => {
        return {
          strategiesNo: item.strategies_no ? item.strategies_no.substring(0, 2) : null,
          key: `project_strategies_items_id_${item.id}`,
          label: item.strategies_no ? `${item.strategies_no} ${item.title}` : item.title,
          value: String(item.id),
        };
      });
      let mergedData = null;
      if (subKey.value === "subQuestions" && subKey.id === 2) {
        mergedData = data.map((dataItem) => {
          const matchingSubQuestions = options.filter(
            (options: { strategiesNo: string }) => options.strategiesNo === dataItem.key
          );
          return {
            ...dataItem,
            options: matchingSubQuestions.map((item: any) => _.omit(item, ["strategiesNo"])),
            type: type.find((type) => type.key === subKey.id)?.value || "",
          };
        });
      }
      if (item.id === subKey.id) {
        mappedItem["key"] = `has_project_strategies_${item.id}`;
        mappedItem["label"] = item.title;
        mappedItem[subKey.value] = mergedData ? mergedData : options.map((item: any) => _.omit(item, ["strategiesNo"]));
        mappedItem[subKey.typeValue] = type.find((type) => type.key === item.id)?.value || "";
      }
    });
    return mappedItem;
  });
  return result;
}

async function fetchProjectDetail() {
  const projectStrategies = await fetchProjectStrategies();
  const projectCharacteristics: ProjectCharacteristics[] = await fetchProjectCharacteristics();
  const projectTypes: ProjectTypes[] = await fetchProjectTypes();
  // const projectLocations: ProjectLocations[] = await fetchProjectLocations();
  const dastaWorkingArea: DastaWorkingArea[] = await fetchDastaWorkingArea();
  const organizations: Organizations[] = await fetchOrganizations(["organization_type", "-id"]);
  const sdgs: Sdgs[] = await fetchSdgs();
  const fetchDastaWorkingObjective: DastaWorkingObjective[] = await fetchProjectDastaWorkingObjective();
  const project = {
    "1": {
      category: "section",
      key: "has_project_strategies",
      label: "1. ความเชื่อมโยงของโครงการยุทธศาสตร์และแผนงานเกี่ยวข้อง",
      questions: [
        ...projectStrategies,
        {
          key: "dasta_objective",
          label: "สนับสนุนเป้าหมายการดำเนินงานของ อพท. ในประเด็น",
          options: fetchDastaWorkingObjective,
          type: "checkboxWithTextField",
        },
      ],
    },
    "2": {
      category: "question",
      key: "project_characteristic",
      label: "2. ลักษณะโครงการ",
      options: projectCharacteristics,
      type: "radio",
      // other: {
      //   key: "project_characteristic_other",
      //   placeholder: "ระบุข้อมูล",
      //   type: "text",
      // },
    },
    "3": {
      category: "question",
      key: "project_type",
      label: "3. ประเภทโครงการ",
      options: projectTypes,
      type: "checkbox",
    },
    "4": {
      category: "question",
      key: "project_status",
      label: "4. สถานะโครงการ",
      options: [
        {
          key: "project_status_new",
          label: "โครงการใหม่",
          value: "new",
        },
        {
          key: "project_status_continue",
          label: "โครงการต่อเนื่อง",
          value: "continue",
        },
      ],
      type: "customComponent",
    },
    "5": {
      category: "section",
      key: "project_locations",
      label: "5. พื้นที่เป้าหมายในการดำเนินการ",
      type: "customComponent",
    },
    "6": {
      category: "question",
      description: "(เลือกได้มากกว่า 1 ส่วนกลาง/พื้นที่พิเศษ)",
      key: "dasta_working_area",
      label: "6 พื้นที่ดำเนินงาน",
      subQuestionType: "checkbox",
      subQuestions: [
        {
          key: "6-1",
          label: "",
          options: dastaWorkingArea,
          type: "checkbox",
        },
      ],
    },
    "7": {
      category: "question",
      key: "7",
      label: "7. หน่วยงานที่ขับเคลื่อนโครงการ",
      placeholder: "หน่วยงาน",
      questions: [
        {
          key: "project_owner",
          label: "หน่วยงานที่ขับเคลื่อนโครงการ",
          placeholder: "หน่วยงาน",
          options: organizations,
          type: "dropdown",
        },
        {
          key: "project_owner_other",
          label: "อื่นๆ",
          placeholder: "อื่นๆ",
          type: "textField",
        },
      ],
    },
    "8": {
      category: "section",
      key: "duration_type_year",
      label: "8. ระยะเวลาขับเคลื่อนโครงการ (ปี)",
      questions: [
        {
          key: "project_duration_year",
          label: "ระยะเวลาขับเคลื่อนโครงการ (ปี)",
          placeholder: "ปี",
          type: "textField",
        },
        {
          key: "project_start_year",
          label: "ปีที่เริ่มขับเคลื่อนโครงการ (พ.ศ.)",
          placeholder: "ปี พ.ศ.",
          type: "textField",
        },
        {
          disabled: true,
          displayCondition: {
            action: "plus",
            keys: [
              {
                action: "minus",
                key: "step2.8.questions[0]",
                value: 1,
              },
              {
                action: null,
                key: "step2.8.questions[1]",
                value: null,
              },
            ],
          },
          key: "project_end_year",
          label: "ปีที่โครงการเสร็จสิ้น (พ.ศ.)",
          placeholder: "ปี พ.ศ.",
          type: "textField",
        },
      ],
    },
    "9": {
      category: "section",
      key: "9",
      label: "9. ผลสืบเนื่องหลังระยะเวลาดำเนินโครงการ (ปี)",
      questions: [
        {
          key: "project_consequence_duration_year",
          label: "ผลสืบเนื่องหลังระยะเวลาดำเนินโครงการ (ปี)",
          placeholder: "ปี",
          type: "textField",
        },
        {
          disabled: true,
          displayCondition: {
            action: "plus",
            keys: [
              {
                action: null,
                key: "step2.8.questions[2]",
                value: null,
              },
              {
                action: null,
                key: "step2.9.questions[0]",
                value: null,
              },
            ],
          },
          key: "project_consequence_end_year",
          label: "ปีสิ้นสุดผลสืบเนื่องหลังระยะเวลาดำเนินโครงการ (พ.ศ.)",
          placeholder: "ปี พ.ศ.",
          type: "textField",
        },
      ],
    },
    "10": {
      category: "question",
      key: "project_budget",
      label: "10. งบประมาณขับเคลื่อนโครงการ (บาท)",
      placeholder: "",
      type: "customComponent",
    },
    "11": {
      category: "question",
      key: "project_objectives",
      label: "11. วัตถุประสงค์โครงการ (Objective)",
      placeholder: "",
      type: "textFieldArray",
    },
    "12": {
      category: "question",
      key: "project_activities",
      label: "12. กิจกรรมภายในโครงการ (Activity)",
      placeholder: "",
      type: "textFieldArray",
    },
    "13": {
      category: "question",
      key: "project_outputs",
      label: "13. ผลผลิตจากการดำเนินโครงการ (Output)",
      placeholder: "",
      type: "textFieldArray",
    },
    "14": {
      category: "question",
      key: "project_outcomes",
      label: "14. ตัวชี้วัดความเปลี่ยนแปลง (Outcome)",
      placeholder: "",
      type: "textFieldArray",
    },
    "15": {
      category: "question",
      key: "project_utilizers",
      label: "15. ผู้ที่ใช้ประโยชน์",
      placeholder: "",
      type: "textFieldArray",
    },
    "16": {
      category: "question",
      key: "project_sdgs",
      label: "16. SDGs",
      options: sdgs,
      type: "checkbox",
    },
    label: "2. ทบทวนรายละเอียดโครงการที่ต้องประเมิน",
  };
  return project;
}

async function fetchProjectManagementFolderId() {
  // list folders
  const folders = await cmsApi.request(
    readFolders({
      fields: ["id"],
      filter: {
        name: {
          _eq: "Project Management",
        },
      },
    })
  );

  console.log("folders: ", folders);
  if (isEmpty(folders)) throw new Error("no-attachments-folder");

  return folders[0].id;
}

async function uploadProjectManagementAttachments(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", e);
  }
}
export {
  fetchDastaWorkingArea,
  fetchOrganizations,
  fetchProject,
  fetchProjectCharacteristics,
  fetchProjectDetail,
  fetchProjectManagementFolderId,
  fetchProjectStrategies,
  fetchProjectTypes,
  uploadProjectManagementAttachments,
};
