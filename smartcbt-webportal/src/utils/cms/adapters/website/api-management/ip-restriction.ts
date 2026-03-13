"use server";

import { getApiGatewayUrl } from "@/utils/cms/api-helpers";
import * as _ from "lodash";
import { fetchApiOnBoarding } from ".";
import { Profile } from "../../authen";

async function addIpAddress(profile: Profile, ipAddress: string) {
  const plugin = await getPluginIpRestriction(profile);
  const apiOnBoarding = await fetchApiOnBoarding(profile);
  const consumerId = String(apiOnBoarding?.consumer_id);
  const url = getApiGatewayUrl();

  // have exist plugin use patch
  if (!_.isEmpty(plugin)) {
    const response = await fetch(`${url}/plugins/${plugin.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...plugin,
        config: {
          allow: [..._.get(plugin, ["config", "allow"], []), ipAddress],
        },
      }),
    });
    const result = await response.json();
    return _.get(result, ["id"], null);
  } else {
    const response = await fetch(`${url}/consumers/${consumerId}/plugins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "ip-restriction",
        consumer: { id: consumerId },
        config: {
          allow: [ipAddress],
        },
      }),
    });
    const result = await response.json();
    return _.get(result, ["id"], null);
  }
}

async function removeIpAddress(profile: Profile, ipAddress: string) {
  const plugin = await getPluginIpRestriction(profile);
  const url = getApiGatewayUrl();

  const response = await fetch(`${url}/plugins/${plugin.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...plugin,
      config: {
        allow: _.get(plugin, ["config", "allow"], []).filter((item: string) => item != ipAddress),
      },
    }),
  });
  const result = await response.json();
  return _.get(result, ["id"], null);
}

async function listIpRestriction(profile: Profile) {
  const plugin = await getPluginIpRestriction(profile);

  return _.get(plugin, ["config", "allow"], []);
}

async function getPluginIpRestriction(profile: Profile) {
  const apiOnBoarding = await fetchApiOnBoarding(profile);
  const consumerId = String(apiOnBoarding?.consumer_id);
  const url = getApiGatewayUrl();

  const response = await fetch(`${url}/consumers/${consumerId}/plugins`, {
    method: "GET",
  });

  const result = await response.json();

  const list = _.get(result, ["data"], []);

  return list.find((item: { name: string }) => item.name == "ip-restriction");
}

export { addIpAddress, listIpRestriction, removeIpAddress };
