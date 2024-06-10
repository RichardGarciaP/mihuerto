import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { ICrop } from "../../Types/ICrop";
export const getAllCultivation = (page: number, rowPerPage: number) => {
  return getFetcher(
    `/cultivation/getAllCultivation?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getAllCultivationActive = () => {
  return getFetcher(`/cultivation/getAllCultivationActive`, false, getToken());
};

export const createCultivation = (data: ICrop) => {
  delete data._id;
  return postFetcher(`/cultivation/createCultivation`, data, getToken());
};

export const updateCultivation = (id: string, data: ICrop) => {
  return patchFetcher(
    `/cultivation/editCultivation?id=${id}`,
    data,
    getToken(),
  );
};
