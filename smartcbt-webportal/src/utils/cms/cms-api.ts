import {
  DirectusClient,
  RequestTransformer,
  RestCommand,
  authentication,
  createDirectus,
  graphql,
  rest,
  staticToken,
} from "@directus/sdk";
// import "server-only";
import { getCmsURL } from "./api-helpers";
import { Collection } from "./cms-type";

// callback function to transform the request
const withRequestCallback = function <Schema extends object, Output>(
  onRequest: RequestTransformer,
  getOptions: RestCommand<Output, Schema>
): RestCommand<Output, Schema> {
  return () => {
    const options = getOptions();
    options.onRequest = onRequest;
    return options;
  };
};

// Validate the token on every request
export const withRevalidate = function <Schema extends object, Output>(
  getOptions: RestCommand<Output, Schema>,
  revalidate: number
): RestCommand<Output, Schema> {
  return () => {
    const options = getOptions();
    // console.log("path: ", options.path);
    // console.log("method: ", options.method);
    options.onRequest = (options: RequestInit) => {
      return { ...options, next: { revalidate: revalidate } };
    };
    return options;
  };
};

const cmsApi = createDirectus<Collection>(getCmsURL())
  // .with(staticToken(process.env.CMS_ADMIN_TOKEN || ""))
  .with(rest())
  .with(graphql())
  .with(
    authentication("json", {
      // storage: authLocalStorage(), // here set the storage previously created
      autoRefresh: true,
    })
  );

export const publicApi = createDirectus<Collection>(getCmsURL())
  // .with(staticToken(process.env.CMS_ADMIN_TOKEN || ""))
  .with(rest())
  .with(graphql());

export const setAdminToken = function (cmsApi: DirectusClient<Collection>) {
  return cmsApi.with(staticToken(process.env.CMS_ADMIN_TOKEN || ""));
};

export default cmsApi;
