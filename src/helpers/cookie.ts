import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });

export const TOKEN = "TOKEN";

export const getCookieToken = () => {
  return cookies.get(TOKEN);
};

export const setCookieToken = (value: any) => {
  cookies.set(TOKEN, value);
};

export const removeAllCookie = () => {
  cookies.remove(TOKEN);
};
