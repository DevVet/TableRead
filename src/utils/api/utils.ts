import { ApiRequestConfig } from "@/types/api";
import axios, { AxiosPromise } from "axios";

const appBaseUrl = process.env.isDevelopment
  ? "http://localhost:3000"
  : "http://www.example.com";

export const generateDataOrParams = (
  method: string | undefined,
  useParamsForDelete = true
): "params" | "data" => {
  const isGet = method?.toLowerCase() === "get";
  const isDelete = method?.toLowerCase() === "delete";
  return isGet || (isDelete && useParamsForDelete) ? "params" : "data";
};

export const createApiService = (ext: string) => {
  const axiosClient = axios.create({
    baseURL: `${appBaseUrl}${ext}`,
  });

  return <D = unknown>({
    url = "/",
    method = "GET",
    payload,
    cache,
  }: ApiRequestConfig): AxiosPromise<D> => {
    const dataOrParams = generateDataOrParams(method);
    const config = {
      url,
      method,
      [dataOrParams]: payload,
      cache,
    };

    return axiosClient.request<D>(config);
  };
};
