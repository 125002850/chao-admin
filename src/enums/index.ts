type enum2OptionsConfig = {
  forceNumeric: boolean;
};

const defaultEnum2OptionsConfig: enum2OptionsConfig = {
  forceNumeric: true
};

export const enum2Options = (obj: Record<string, string>, config?: enum2OptionsConfig) => {
  const { forceNumeric } = { ...defaultEnum2OptionsConfig, ...config };
  return Object.entries(obj).map(([key, label]) => {
    const value = Number(key);
    return {
      label,
      value: forceNumeric ? (isNaN(value) ? key : value) : key // 如果是数字类型，保留数字
    };
  });
};

export enum ApprovalStatus {
  Pending,
  Approved,
  Rejected
}

export const ApprovalTransform = {
  [ApprovalStatus.Pending]: "审批中",
  [ApprovalStatus.Approved]: "通过",
  [ApprovalStatus.Rejected]: "拒绝"
};

export enum Operations {
  Watch = "1",
  Brand = "2",
  BizRecord = "3",
  PriceRecord = "4",
  Employee = "5"
}

export const OperationTransform = {
  [Operations.Watch]: "编辑手表",
  [Operations.Brand]: "编辑品牌",
  [Operations.BizRecord]: "编辑买卖记录",
  [Operations.PriceRecord]: "编辑报价记录",
  [Operations.Employee]: "编辑人员权限"
};

export enum Roles {
  Mobile = "1",
  Admin = "2"
}

export const RoleTransform = {
  [Roles.Mobile]: "移动端",
  [Roles.Admin]: "管理端"
};

export enum YesOrNo {
  No,
  Yes
}

export const WatchStatusTranslate = {
  [YesOrNo.No]: "下架",
  [YesOrNo.Yes]: "上架"
};
