import { readSingleton } from "@directus/sdk";
import { publicApi, withRevalidate } from "../../cms-api";
import { Collection } from "../../cms-type";

type ConfigGlobal = Collection["config_global"];

const fetchConfigGlobal = async function name(lang: string) {
  // console.log("fetchConfigGlobal...", lang);
  // TODO: Need to fix this
  lang = "th-TH";
  return (await publicApi.request(
    withRevalidate(
      readSingleton("config_global", {
        deep: {
          // @ts-ignore
          translations: {
            _filter: {
              languages_id: {
                _eq: lang,
              },
            },
          },
        },
        fields: [
          "*",
          {
            // @ts-ignore
            translations: ["*"],
          },
        ],
      }),
      10
    )
  )) as ConfigGlobal;
};

export { fetchConfigGlobal };
