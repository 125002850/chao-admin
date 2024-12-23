import { Upload } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http, { config, RequestHttp } from "@/api";

const http2 = new RequestHttp({ ...config, baseURL: "/admin" });

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: FormData) => {
  return http2.post<Upload.ResFileUrl>(`/upload/img`, params, { cancel: false });
};

// 视频上传
export const uploadVideo = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(PORT1 + `/file/upload/video`, params, { cancel: false });
};
