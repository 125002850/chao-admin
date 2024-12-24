<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="fetchWatchList">
      <!-- 表格 header 按钮 -->
      <template #header="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增手表</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
      </template>
    </ProTable>
    <FormDrawer ref="FormDrawerRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive, useTemplateRef } from "vue";
import { Watch } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import FormDrawer from "./FormDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, EditPen, View } from "@element-plus/icons-vue";
import { editUser, addUser, changeUserStatus, getUserStatus } from "@/api/modules/user";
import { fetchWatchAdd, fetchWatchById, fetchWatchEdit, fetchWatchList, fetchWatchStatusSwitch } from "@/api/modules/watch";
import { fetchBrandOptions } from "@/api/modules/brand";
import { enum2Options, WatchStatusTranslate } from "@/enums";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns = reactive<ColumnProps<Watch.Vo>[]>([
  { type: "selection", fixed: "left", width: 70 },
  {
    prop: "name",
    label: "手表名称",
    search: { el: "input" }
  },
  {
    prop: "brandId",
    label: "品牌",
    enum: fetchBrandOptions,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "name", value: "id" }
  },
  {
    // 多级 prop
    prop: "model",
    label: "型号"
  },
  { prop: "createDate", label: "入库时间" },

  {
    prop: "status",
    label: "状态",
    enum: ref(enum2Options(WatchStatusTranslate)),
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "label", value: "value" },
    render: scope => {
      return (
        <>
          <el-switch
            model-value={scope.row.status}
            active-text={scope.row.status ? "上架" : "下架"}
            active-value={1}
            inactive-value={0}
            onClick={() => changeStatus(scope.row)}
          />
        </>
      );
    }
  },
  {
    prop: "createDate",
    label: "创建时间",
    width: 180,
    search: {
      el: "date-picker",
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" }
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

// 切换状态
const changeStatus = async (row: Watch.Vo) => {
  await useHandleData(fetchWatchStatusSwitch, { id: row.id, status: row.status }, `切换【${row.name}】状态`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = useTemplateRef("FormDrawerRef");
const openDrawer = async (title: string, row: Partial<Watch.Vo> = {}) => {
  const data = title === "新增" ? {} : ((await fetchWatchById(row.id!))?.data ?? {});
  drawerRef.value?.acceptParams({
    title,
    disabled: title === "查看",
    data,
    onConfirm: title === "新增" ? fetchWatchAdd : title === "编辑" ? fetchWatchEdit : undefined,
    callback: proTable.value?.getTableList
  });
};
</script>
