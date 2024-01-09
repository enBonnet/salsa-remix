const apiUrl = process.env.STRAPI_API_URL;
const cmsUrl = process.env.STRAPI_URL;
const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === "production";
const userSessionBase = process.env.USER_SESSION_SECRET;

if (!userSessionBase)
  throw "USER_SESSION_SECRET environment variable is required!";

const userSessionSecret = userSessionBase;

export { apiUrl, cmsUrl, nodeEnv, isProduction, userSessionSecret };
