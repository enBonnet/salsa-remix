const apiUrl = process.env.STRAPI_API_URL;
const cmsUrl = process.env.STRAPI_URL;
const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === "production";

export { apiUrl, cmsUrl, nodeEnv, isProduction };
