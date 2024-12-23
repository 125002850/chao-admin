<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getTableList">
      <!-- 表格 header 按钮 -->
      <template #header="scope"></template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <FromDrawer ref="refFormDrawer" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import FromDrawer from "@/views/check/FormDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, View, Refresh } from "@element-plus/icons-vue";
import { getUserList, deleteUser, editUser, addUser, resetUserPassWord } from "@/api/modules/user";
import { fetchShopOptions } from "@/api/modules/shop";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getUserList(newParams);
};

// 表格配置项
const columns = reactive<ColumnProps<User.Vo>[]>([
  { type: "index", label: "序号", width: 80 },
  { type: "selection", fixed: "left", width: 70 },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input" }
  },
  { prop: "phone", label: "联系电话" },
  {
    label: "所属店铺",
    prop: "shopId",
    search: { el: "select" },
    enum: fetchShopOptions,
    fieldNames: {
      label: "shopName",
      value: "id"
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const refFormDrawer = ref<InstanceType<typeof FromDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  const params = {
    title,
    disabled: title === "查看",
    data: { ...row },
    onConfirm: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
    callback: proTable.value?.getTableList
  };
  refFormDrawer.value?.acceptParams(params);
};
</script>
