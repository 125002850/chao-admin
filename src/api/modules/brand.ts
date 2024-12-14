import http from "@/api";
export const fetchBrands = params => http.post("/admin/list", params);
