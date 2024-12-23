<template>
  <el-button plain @click="dialogFormVisible = true"> Open a Form nested Dialog </el-button>

  <el-dialog v-model="dialogFormVisible" title="店铺" width="500">
    <el-form :model="formData">
      <el-form-item label="店铺名称" :label-width="formLabelWidth" required>
        <el-input v-model="formData.shopName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dialogFormVisible = ref(false);
const formLabelWidth = "110px";

const formData = ref({
  shopName: ""
});

const drawerProps = ref<AcceptParams>();

type AcceptParams = {
  form: any;
  onConfirm?: (params: any) => Promise<any>;
};

const acceptParams = (params: AcceptParams) => {
  drawerProps.value = params;
  formData.value = params.form;
  dialogFormVisible.value = true;
};

const handleConfirm = async () => {
  await drawerProps.value?.onConfirm?.(formData.value!);
  dialogFormVisible.value = false;
};

defineExpose({ acceptParams });
</script>
