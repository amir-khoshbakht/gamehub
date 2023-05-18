export const makeURL = (path: string, args: object = {}) => {
  const uRLSearchParams = new URLSearchParams(rejectEmpty(args));
  const url = new URL(path);
  url.search = uRLSearchParams.toString();
  return url;
};

export const rejectEmpty = (object: object) => {
  return Object.entries(object)
    .filter(([, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
};
