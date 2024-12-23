import { config, RequestHttp } from "..";
import { Watch } from "../interface";

const http = new RequestHttp({ ...config, baseURL: "/admin" });

export const fetchWatchList = (params: Watch.Dto) => http.post<Watch.Vo>("/admin/watchs", params);
