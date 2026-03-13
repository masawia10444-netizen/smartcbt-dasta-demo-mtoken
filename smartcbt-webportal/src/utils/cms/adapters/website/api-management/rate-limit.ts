"use server";

import { getApiGatewayUrl, getApiPrometheusUrl, getRateLimit } from "@/utils/cms/api-helpers";
import * as _ from "lodash";
import { fetchApiOnBoarding } from ".";
import { Profile } from "../../authen";

async function rateLimitConfig(profile: Profile) {
  const plugin = await getPluginRateLimit(profile);
  const countRequest = await getRequestApiCount(profile);
  return {
    // day: _.get(plugin, ["config", "day"], 0),
    month: _.get(plugin, ["config", "month"], 0),
    month_count: countRequest,
    month_remaining: _.get(plugin, ["config", "month"], 0) - countRequest,
  };
}

async function prometheusRequest(consumer: string, start: number, end: number, step: number) {
  const url = getApiPrometheusUrl();
  const response = await fetch(
    `${url}/api/v1/query_range?query=kong_http_requests_total{consumer="${consumer}"}&start=${start}&end=${end}&step=${step}`,
    {
      method: "GET",
    }
  );
  const result = await response.json();
  return result;
}

async function getRequestApiCount(profile: Profile) {
  const current = new Date();
  const firstDay = new Date(current.getFullYear(), current.getMonth(), 1).getTime() / 1000;
  const lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0).getTime() / 1000;
  const nowDay = new Date().getTime() / 1000;
  const emailConsumer = encodeURIComponent(profile.email);
  const resultFirstDay = await prometheusRequest(emailConsumer, firstDay, lastDay, 10000);
  const resultNowDay = await prometheusRequest(emailConsumer, nowDay, nowDay, 10000);
  return resultNowDay.data.result[0].values[0][1] - resultFirstDay.data.result[0].values[0][1];
}

async function getRequestApiCountFilter(profile: Profile, query: { start: string; end: string }) {
  const emailConsumer = encodeURIComponent(profile.email);
  const startDate = new Date(query.start).getTime() / 1000;
  const endDate = new Date(query.end).getTime() / 1000;
  const timeDifference = endDate - startDate;
  let step = 0;
  if (timeDifference >= 31536000) {
    step = 2678400;
  } else if (timeDifference >= 4838400) {
    step = 604800;
  } else if (timeDifference >= 2592000) {
    step = 86400;
  } else if (timeDifference >= 604800) {
    step = 86400;
  } else if (timeDifference >= 86400) {
    step = 3600;
  }

  const beforeResult = await prometheusRequest(emailConsumer, startDate - step, startDate, step);
  const firstResult = beforeResult.data.result[0]?.values;
  const dataBefore = _.last(_.first(firstResult) as string[]) ?? 0;
  const filterResult = await prometheusRequest(emailConsumer, startDate, endDate, step);
  let dataFilter = filterResult.data.result[0]?.values;
  const lastDataFilter = _.first(_.last(dataFilter) as string[]);
  let lastValueData;
  if (Number(lastDataFilter) < endDate) {
    const lastValue = await prometheusRequest(
      emailConsumer,
      lastDataFilter ? Number(lastDataFilter) : Number(endDate),
      lastDataFilter ? Number(lastDataFilter + step) : Number(endDate + step),
      step / 100
    );
    lastValueData = _.last(lastValue.data.result[0].values) as string[];
  }
  const timestampsList = Array.from({ length: Math.ceil((endDate - startDate) / step) + 1 }, (_, i) => [
    startDate + i * step,
    Number(dataBefore),
  ]);
  let mergedTimestampsList = timestampsList.map(([timestamp, value]) => {
    const match = dataFilter.find(([baseTimestamp]: string[]) => Number(baseTimestamp) === timestamp);
    return match ? match : [timestamp, value];
  });

  if (!_.isNil(lastValueData)) {
    mergedTimestampsList = [...mergedTimestampsList, lastValueData];
  }
  let prevValue = Number(dataBefore);
  const result = mergedTimestampsList?.map(([timestamp, value]: string[]) => {
    const diff = Number(value) - prevValue < 0 ? 0 : Number(value) - prevValue;
    prevValue = Number(value) > 0 ? Number(value) : prevValue;
    return { timestamp: new Date(Number(timestamp) * 1000).toISOString(), value: diff };
  });
  return result;
}

async function getPluginRateLimit(profile: Profile) {
  const apiOnBoarding = await fetchApiOnBoarding(profile);
  const consumerId = String(apiOnBoarding?.consumer_id);
  const url = getApiGatewayUrl();

  const response = await fetch(`${url}/consumers/${consumerId}/plugins`, {
    method: "GET",
  });

  const result = await response.json();

  const list = _.get(result, ["data"], []);

  return list.find((item: { name: string }) => item.name == "rate-limiting");
}

async function addRateLimit(consumerId: string) {
  const url = getApiGatewayUrl();
  const rateLimit = Number(getRateLimit());

  const response = await fetch(`${url}/consumers/${consumerId}/plugins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "rate-limiting",
      consumer: { id: consumerId },
      config: {
        month: rateLimit,
        policy: "local",
      },
    }),
  });
  const result = await response.json();

  return _.get(result, ["id"], null);
}

export { addRateLimit, getRequestApiCountFilter, rateLimitConfig };
