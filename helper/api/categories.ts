import { getFetcher } from "../api";
import { getToken } from "../../utils/utils";
export const getAllCategory = (page: number, rowPerPage: number) => {
  return getFetcher(
    `/category/getAllCategory?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};
