const trimTrailingSlash = (value) => value?.trim().replace(/\/+$/, "");

const configuredApiBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL,
);

if (!configuredApiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is not configured");
}

if (import.meta.env.PROD && /^http:\/\//i.test(configuredApiBaseUrl)) {
  throw new Error("VITE_API_BASE_URL must use HTTPS in production");
}

const apiOrigin = configuredApiBaseUrl.replace(/\/api$/i, "");

export const API_ORIGIN = apiOrigin;
export const API_BASE_URL = /\/api$/i.test(configuredApiBaseUrl)
  ? configuredApiBaseUrl
  : `${apiOrigin}/api`;

export const NOTIFICATION_HUB_URL = trimTrailingSlash(
  import.meta.env.VITE_SIGNALR_URL,
) || `${apiOrigin}/hubs/realtime`;

const defaultChatSocketUrl = `${apiOrigin.replace(/^http/i, "ws")}/chat`;

export const CHAT_SOCKET_URL = trimTrailingSlash(
  import.meta.env.VITE_CHAT_SOCKET_URL,
) || defaultChatSocketUrl;

if (import.meta.env.PROD && /^http:\/\//i.test(NOTIFICATION_HUB_URL)) {
  throw new Error("VITE_SIGNALR_URL must use HTTPS in production");
}

if (import.meta.env.PROD && /^ws:\/\//i.test(CHAT_SOCKET_URL)) {
  throw new Error("VITE_CHAT_SOCKET_URL must use WSS in production");
}
