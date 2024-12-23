<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="fetchUserApprovalList">
      <!-- 表格 header 按钮 -->
      <template #header="scope"> </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <template v-if="scope.row?.status === ApprovalStatus.Pending">
          <el-button type="primary" link :icon="Check" @click="handleApproved(scope.row)">通过</el-button>
          <el-button type="primary" link :icon="Failed" @click="handleRejected(scope.row)">拒绝</el-button>
        </template>
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
      </template>
    </ProTable>
    <FormDrawer ref="refFormDrawer" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import FormDrawer from "@/views/check/FormDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { Failed, Check, View, Refresh } from "@element-plus/icons-vue";
import { editUser, addUser, resetUserPassWord, fetchUserApprovalList, fetchUserRejected } from "@/api/modules/user";
import { ApprovalStatus, ApprovalTransform, enum2Options } from "@/enums";
import { ElMessageBox } from "element-plus";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）

// 表格配置项
const columns = reactive<ColumnProps<User.ApprovalVo>[]>([
  { type: "selection", fixed: "left" },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input" }
  },
  { prop: "phone", label: "联系电话", search: { el: "input" } },
  {
    prop: "createDate",
    label: "申请时间",
    search: {
      el: "date-picker",
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" }
    }
  },
  {
    prop: "status",
    label: "审批状态",
    enum: enum2Options(ApprovalTransform)
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

const handleApproved = async (row: User.ApprovalVo) => {
  openDrawer("编辑");
};

const handleRejected = async (row: User.ApprovalVo) => {
  try {
    await ElMessageBox.confirm("确定要对该人员进行拒绝操作吗?");
    await fetchUserRejected(row.id);
    proTable.value?.getTableList();
  } catch {}
};

// 打开 drawer(新增、查看、编辑)
const refFormDrawer = ref<InstanceType<typeof FormDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  refFormDrawer.value?.acceptParams({
    title,
    disabled: title === "查看",
    data: { ...row, isCheck: title === "编辑" },
    onConfirm: editUser,
    callback: proTable.value?.getTableList
  });
};
</script>
