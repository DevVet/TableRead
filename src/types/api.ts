import { Method, RawAxiosRequestHeaders } from "axios";
import { GenericObject } from "./general";

export interface ApiRequestConfig {
  url?: string;
  method?: Method;
  payload?: GenericObject | unknown[] | FormData;
  headers?: RawAxiosRequestHeaders;
  cache?: boolean;
}
