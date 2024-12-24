// 请求响应参数（不包含data）

export type Option = {
  label: string;
  value: string | number;
};

export interface CommonVo {
  id: string;
  createDate: string;
  createUser: string;
  updateDate: string;
  updateUser: string;
}
export interface Result {
  code: string;
  msg: string;
}

export type Image = {
  url: string;
  isMain: number; //0 否 1 是
  sort: number;
};

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  currPage: number;
  pageNum: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  currPage: number;
  pageNum: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    token?: string;
    shopId?: string;
    username?: string;
    phone?: string;
    gender?: number;
    operateAuthorization?: string;
    admin?: boolean;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }

  export interface Dto extends ReqPage {
    shopId?: string;
    username?: string;
  }

  export interface Vo extends CommonVo {
    address: string;
    dataAuthorization: string;
    gender: number;
    openid: string;
    operateAuthorization: string;
    password: string;
    phone: string;
    shopId: string;
    username: string;
  }

  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }

  export interface ApprovalDto {
    id?: string;
    shopId?: string;
    operateAuthorization?: string;
    roleType?: string;
    password?: string;
    username?: string;
    phone?: string;
    openid?: string;
  }

  export interface ApprovalVo extends CommonVo {
    openid: string;
    phone: string;
    pictureUrl: string;
    shopId: string;
    status: number;
    username: string;
  }
}

//品牌模型
export namespace Brand {
  export type Series = {
    id?: string;
    name: string;
  };
  export interface Vo extends CommonVo {
    name: string;
    remarks: string;
    brandInfos: Series[];
  }

  export interface Dto {
    id?: number;
    name?: string;
    remarks?: string;
    series?: Series[];
  }
}

//店铺模型
export namespace Shop {
  export interface Vo extends CommonVo {
    shopName: string;
  }
}

//手表模型
export namespace Watch {
  export interface Dto extends ReqPage {
    name?: string; //名称
    model?: string; //型号
    status?: number; //状态
    brandId?: string; //品牌id
    brandInfoId?: string; //系列id
    pubPrice?: number; //公价
    groupIds?: number[]; //分组ids
    pictures: Image[];
  }

  export interface Vo extends CommonVo {
    name: string;
    model: string;
    status: number;
    pubPrice: number; //公价
    brandName: string; //品牌
    brandId: string; //品牌id
    shopId: string;
    groupNames: string[];
    groupIds: number[];
    pictures: Image[];
  }
}
