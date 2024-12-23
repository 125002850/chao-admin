import { config, RequestHttp } from "..";
import { ReqPage, ResPage, Shop } from "../interface";

const http = new RequestHttp({ ...config, baseURL: "/admin" });
export const fetchShops = (params: ReqPage) => http.post("/admin/shops", params);
export const fetchShopOptions = () => http.post<Shop.Vo[]>("/admin/shop/drop", {}, { cancel: false });
export const fetchShopAdd = (params: { shopName: string }) =>
  http.put<Shop.Vo[]>("/admin/shop", params, { headers: { "Content-Type": "application/json" } });
export const fetchShopEdit = (params: { shopName: string }) => http.post<Shop.Vo[]>("/admin/shop", params);
export const fetchShopDel = (id: string) => http.delete(`/admin/shop/${id}`);
