// Minimal next-intl config - satisfies the config file requirement
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale ?? "en";
  return {
    locale,
    messages: {}
  };
});
