<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="fetchBrands">
      <!-- 表格 header 按钮 -->
      <template #header="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增品牌</el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteBrand(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <FormDrawer ref="refFormDrawer" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { Brand, User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { ElMessage, ElMessageBox } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import FormDrawer from "@/views/brand/FormDrawer.vue";
import { ProTableInstance, ColumnProps, HeaderRenderScope } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";
import { fetchBrandDel, fetchBrands, fetchBrandAdd, fetchBrandEdit, fetchBrandById } from "@/api/modules/brand";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  { type: "selection", fixed: "left", width: 70 },
  {
    prop: "name",
    label: "品牌",
    search: {
      el: "input"
    }
  },
  {
    prop: "goodsNum",
    label: "手表数量"
  },
  {
    prop: "remark",
    label: "备注"
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

const deleteBrand = async (params: Brand.Vo) => {
  await useHandleData(fetchBrandDel, params.id, `删除【${params.name}】`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const refFormDrawer = ref<InstanceType<typeof FormDrawer> | null>(null);
const openDrawer = async (title: string, row: Partial<Brand.Vo> = {}) => {
  const series = ref<Brand.Series[]>([]);
  if (["查看", "编辑"].includes(title)) {
    const rsp = await fetchBrandById(row.id!);
    series.value = rsp?.data?.brandInfos ?? [];
  }
  const params = {
    title,
    isView: title === "查看",
    row: { brandInfos: series.value, ...row },
    api: title === "新增" ? fetchBrandAdd : title === "编辑" ? fetchBrandEdit : undefined,
    getTableList: proTable.value?.getTableList
  };
  refFormDrawer.value?.acceptParams(params);
};
</script>
