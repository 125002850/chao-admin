import { config, RequestHttp } from "@/api";
import { Brand, ResPage } from "../interface";

const http = new RequestHttp({ ...config, baseURL: "/admin" });

export const fetchBrands = (params: Brand.Vo) => http.post<ResPage<Brand.Vo>>("/admin/brands", params);
export const fetchBrandAdd = (params: Brand.Dto) => http.put("/admin/brand", params);
export const fetchBrandEdit = (params: Brand.Dto) => http.post("/admin/brand", params);
export const fetchBrandById = (id: string) => http.get<Brand.Vo>(`/admin/brand/${id}`);
export const fetchBrandDel = (id: string) => http.delete(`/admin/brand/${id}`);
export const fetchBrandOptions = () => http.post<Brand.Vo[]>("/admin/brand/drop", {}, { cancel: false });
