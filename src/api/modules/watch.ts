import { YesOrNo } from "@/enums";
import { config, RequestHttp } from "..";
import { Watch } from "../interface";

const http = new RequestHttp({ ...config, baseURL: "/admin" });

export const fetchWatchList = (params: Watch.Dto) => http.post<Watch.Vo>("/admin/watchs", params);
export const fetchWatchAdd = (params: Watch.Dto) => http.put<Watch.Vo>("/admin/watch", params);
export const fetchWatchEdit = (params: Watch.Dto) => http.post<Watch.Vo>("/admin/watch", params);
export const fetchWatchById = (id: string) => http.get<Watch.Vo>(`/admin/watch/${id}`);
export const fetchWatchStatusSwitch = ({ id, status }: { id: string; status: number }) => {
  const api = status === YesOrNo.No ? `/admin/listing/${id}` : `/admin/remove/${id}`;
  return http.get(api);
};
export const fetchGroupDrop = () => http.get<Watch.GroupVo[]>("/admin/drop");
