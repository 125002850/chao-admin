import { ResPage, User } from "@/api/interface/index";
import { config, RequestHttp } from "@/api";

const http = new RequestHttp({ ...config, baseURL: "/admin" });

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>(`/admin/users`, params);
};

// 获取树形用户列表
export const getUserTreeList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>(`/user/tree/list`, params);
};

// 新增用户
export const addUser = (params: { id: string }) => {
  return http.post(`/user/add`, params);
};

// 批量添加用户
export const BatchAddUser = (params: FormData) => {
  return http.post(`/user/import`, params);
};

// 编辑用户
export const editUser = (params: { id: string }) => {
  return http.post(`/admin/user/${params.id}`, params);
};

// 删除用户
export const deleteUser = (params: { id: string[] }) => {
  return http.delete(`/admin/user/delete/${params.id}`);
};

// 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(`/user/change`, params);
};

// 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(`/user/rest_password`, params);
};

// 导出用户数据
export const exportUserInfo = (params: User.ReqUserParams) => {
  return http.download(`/user/export`, params);
};

// 获取用户状态字典
export const getUserStatus = () => {
  return http.get<User.ResStatus[]>(`/user/status`);
};

// 获取用户性别字典
export const getUserGender = () => {
  return http.get<User.ResGender[]>(`/user/gender`);
};

// 获取用户部门列表
export const getUserDepartment = () => {
  return http.get<User.ResDepartment[]>(`/user/department`, {}, { cancel: false });
};

// 获取用户角色字典
export const getUserRole = () => {
  return http.get<User.ResRole[]>(`/user/role`);
};

// 审批列表
export const fetchUserApprovalList = (params: User.ApprovalDto) => http.post<User.ApprovalVo>("/admin/appLys", params);

// 审批通过
export const fetchUserApproved = (params: User.ApprovalDto) => http.post("/admin/adopt", params);

// 审批拒绝
export const fetchUserRejected = (id: string) => http.get(`/admin/noAdopt/${id}`);
