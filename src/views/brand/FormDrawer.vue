<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}品牌`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="品牌名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="请填写品牌名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="系列" prop="series">
        <TagsList v-model="drawerProps.row!.brandInfos!" :disabled="drawerProps.isView" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="drawerProps.row!.remarks" type="textarea" placeholder="请填写备注" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="FormDrawer">
import { ref, reactive, Reactive } from "vue";
import { ElMessage, FormInstance, FormItemRule } from "element-plus";
import { Brand } from "@/api/interface";
import { Arrayable } from "element-plus/es/utils";
import TagsList from "@/components/TagsList/index.vue";

const rules = reactive({
  name: [{ required: true, message: "请输入品牌名" }],
  series: [
    {
      required: true,
      message: "需要添加至少一个系列",
      trigger: "blur",
      validator: (rule, value, callback) => {
        if (value?.length < 1) callback("需要添加至少一个系列");
        callback();
      }
    }
  ]
}) satisfies Reactive<Record<string, Arrayable<FormItemRule>>>;

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<Brand.Vo>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!({ ...drawerProps.value.row, series: drawerProps.value.row.brandInfos });
      ElMessage.success({ message: `${drawerProps.value.title}品牌成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
