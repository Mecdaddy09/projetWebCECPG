const REMOTE_BASE_URL = "https://cartogenre-uf.mastercmw.com";
const DEV_API_PREFIX = "/api";

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);
const stripLeadingSlash = (value) => value.replace(/^\/+/, "");

export const buildApiUrl = (path) => {
    const normalizedPath = stripLeadingSlash(path);

    if (import.meta.env.DEV) {
        return `${DEV_API_PREFIX}/${normalizedPath}`;
    }

    return `${REMOTE_BASE_URL}/${normalizedPath}`;
};

export const buildMediaUrl = (path) => {
    if (!path) {
        return "";
    }

    if (isAbsoluteUrl(path)) {
        return path;
    }

    return `${REMOTE_BASE_URL}/${stripLeadingSlash(path)}`;
};
