import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { IRol } from "../../Types/IRol";
export const getAllCategory = (page: number, rowPerPage: number) => {
  return getFetcher(
    `/category/getAllCategory?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getOneCategory = (id: string) => {
  return getFetcher(`/category/getOneCategory?id=${id}`, false, getToken());
};

export const getActiveCategories = () => {
  return getFetcher(`/category/getAllCategoryActive`, false, getToken());
};

export const createCategory = (data: IRol) => {
  delete data._id;
  return postFetcher(`/category/createCategory`, data, getToken());
};

export const updateCategory = (id: string, data: IRol) => {
  return patchFetcher(`/category/editCategory?id=${id}`, data, getToken());
};
