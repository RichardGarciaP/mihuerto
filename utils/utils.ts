import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "./constants";
import { NextRouter } from "next/router";

export const isBrowser = () => typeof window !== "undefined";

export const handleError = (
  e: any,
  hideError?: boolean,
  stopRedirect?: boolean,
) => {
  if (
    (e?.response?.data?.message == "No autorizado, no se envió el token" ||
      e?.response?.status == 401) &&
    isBrowser() &&
    !stopRedirect
  ) {
    Cookies.remove("token");
    window.location.replace("/login");
  }
  if (!hideError) {
    toast.error(e?.response?.data?.message ?? ERROR_MESSAGE);
  }
  return e;
};

export const getToken = () => Cookies.get("token");

export const setQueryStringValue = (
  key: string,
  value: string | number,
  router: NextRouter,
) => {
  router.push(
    {
      pathname: router.pathname,
      query: { ...router.query, [key]: value },
    },
    undefined,
    { shallow: true },
  );
};
