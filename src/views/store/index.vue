<template>
  <div class="main-box">
    <TreeFilter
      label="shopName"
      title="店铺列表"
      :data="shopOptions"
      :default-value="initParam.shopId"
      @change="changeTreeFilter"
      @insert="handleInsertStore"
      @edit="handleEditStore"
      @delete="handleDeleteStore"
    />
    <div class="table-box">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getUserList"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #header> </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <FromDrawer ref="refFormDrawer" />
      <StoreDialog ref="refStoreDialog" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive, useTemplateRef, onMounted } from "vue";
import { Shop, User } from "@/api/interface";
import { ElMessage, ElMessageBox } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, View } from "@element-plus/icons-vue";
import { getUserList, deleteUser, editUser, addUser } from "@/api/modules/user";
import StoreDialog from "./StoreDialog.vue";
import FromDrawer from "@/views/check/FormDrawer.vue";
import { fetchShopOptions, fetchShopAdd, fetchShopDel, fetchShopEdit } from "@/api/modules/shop";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ shopId: "" });

// 树形筛选切换
const changeTreeFilter = (val: string) => {
  proTable.value!.pageable.currPage = 1;
  initParam.shopId = val;
};

const shopOptions = ref<Shop.Vo[]>([]);

onMounted(() => {
  getShopOptions();
});

const getShopOptions = async () => {
  const rsp = await fetchShopOptions();
  shopOptions.value = rsp?.data ?? [];
};

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
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
    prop: "shopName"
  },
  { prop: "operation", label: "操作", width: 330, fixed: "right" }
]);

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = useTemplateRef("refFormDrawer");
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  const params = {
    title,
    disabled: title === "查看",
    data: { ...row },
    onConfirm: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
    callback: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};

const refStoreDialog = useTemplateRef("refStoreDialog");

const handleInsertStore = () => {
  refStoreDialog.value?.acceptParams({
    form: { shopName: "" },
    onConfirm: async params => {
      await fetchShopAdd(params);
      getShopOptions();
      ElMessage.success("新增成功");
    }
  });
};

const handleEditStore = (scope: any) => {
  refStoreDialog.value?.acceptParams({
    form: { ...scope.data },
    onConfirm: async params => {
      await fetchShopEdit(params);
      getShopOptions();
      ElMessage.success("编辑成功");
    }
  });
};

const handleDeleteStore = async (scope: any) => {
  await ElMessageBox.confirm("是否确认删除该店铺?");
  await fetchShopDel(scope.data.id);
  getShopOptions();
  ElMessage.success("删除成功");
};
</script>
