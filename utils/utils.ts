import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "./constants";
import { NextRouter } from "next/router";
import format from "date-fns/format";

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
    window.location.replace("/dashboard/login");
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

export const textEllipsis = (
  str: string,
  maxLength: number,
  { side = "end", ellipsis = "..." } = {},
) => {
  if (str?.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
};

export const validIfIsBase64 = (image: string) => {
  return image.includes("data:image/");
};

function convertArrayOfObjectsToCSV(array: any, columns: any) {
  let result: any;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = columns.map((column: any) => column.selector);

  // Encabezados de las columnas
  result = "";
  result += columns.map((column: any) => column.name).join(columnDelimiter);
  result += lineDelimiter;

  // Datos de las filas
  array.forEach((item: any) => {
    let ctr = 0;
    keys.forEach((key: any) => {
      if (ctr > 0) result += columnDelimiter;

      result += key(item);

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
export const downloadCSV = (array: any, columns: any, name: string) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array, columns);
  if (csv == null) return;

  const filename = `${getFileName(name)}.csv`;

  const bom = "\uFEFF";
  csv = bom + csv;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

export const getFileName = (name: string) => {
  return `${name}-${format(new Date(), "dd-MM-yyyy-H-m-s")}`;
};
