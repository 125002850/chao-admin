<template>
  <el-drawer v-model="visible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}手表`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.disabled"
      :model="drawerProps.data"
      :hide-required-asterisk="drawerProps.disabled"
    >
      <el-form-item label="品牌" prop="brandId" required>
        <el-select v-model="drawerProps.data!.brandId" placeholder="请选择品牌" clearable filterable>
          <el-option v-for="item in brandOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系列" prop="brandInfoId" required>
        <el-select v-model="data!.brandInfoId" placeholder="请选择系列" clearable filterable>
          <el-option v-for="item in seriesOptions" :label="item.name" :value="item.id!" :key="item.id!"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="drawerProps.data!.name" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="型号" prop="model" required>
        <el-input v-model="drawerProps.data!.model" placeholder="请填写型号" clearable></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="groupIds" required>
        <el-select v-model="drawerProps.data!.groupIds" placeholder="请选择分组" clearable filterable multiple>
          <el-option v-for="item in groupOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公价" prop="pubPrice" required>
        <el-input-number v-model="drawerProps.data!.pubPrice" placeholder="请填写公价" clearable></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片" prop="pictures" required>
        <UploadImgs v-model:file-list="imgs!" width="250px">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传照片</span>
          </template>
          <template #tip> 可拖拽上传 </template>
        </UploadImgs>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button v-show="!drawerProps.disabled" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="FormDrawer">
import { ref, reactive, Reactive, onMounted, computed, watch } from "vue";
import { ElMessage, FormInstance, FormItemRule } from "element-plus";
import { Brand, Option, User, Watch } from "@/api/interface";
import { Arrayable } from "element-plus/es/utils";
import { useDrawer } from "@/hooks/useDrawer";
import { fetchBrandById, fetchBrandOptions } from "@/api/modules/brand";
import { fetchGroupDrop } from "@/api/modules/watch";
import UploadImgs from "@/components/Upload/Imgs.vue";

const rules = reactive({
  brandId: [{ required: true, message: "请选择品牌" }],
  brandInfoId: [{ required: true, message: "请选择系列" }],
  name: [{ required: true, message: "请输入名称" }],
  model: [{ required: true, message: "请输入型号" }],
  pubPrice: [{ required: true, message: "请输入公价" }],
  pictures: [{ required: true, message: "请上传图片" }]
}) satisfies Reactive<Record<string, Arrayable<FormItemRule>>>;

const { visible, acceptParams, drawerProps } = useDrawer<Watch.Dto>(async () => {
  [brandOptions.value, groupOptions.value] = await Promise.all([
    fetchBrandOptions().then(rsp => rsp.data),
    fetchGroupDrop().then(rsp => rsp.data)
  ]);
});

const data = computed(() => drawerProps.value?.data);

const imgs = computed({
  get() {
    return data.value.pictures?.map(item => ({ ...item, name: "abc" }));
  },
  set(val) {
    data.value.pictures = val?.map(item => ({ ...item, isMain: 0, sort: 0 }));
  }
});

const brandOptions = ref<Brand.Vo[]>([]);

const seriesOptions = ref<Brand.Series[]>([]);

const groupOptions = ref<Watch.GroupVo[]>([]);

watch(
  () => drawerProps?.value?.data?.brandId,
  async (val, oldVal) => {
    if (drawerProps.value.data.brandInfoId && oldVal) {
      drawerProps.value.data.brandInfoId = undefined;
      seriesOptions.value = [];
    }
    if (!val) return;
    const rsp = await fetchBrandById(val!);
    seriesOptions.value = rsp?.data?.brandInfos ?? [];
  },
  { immediate: true }
);

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      const params = drawerProps.value.data;
      await drawerProps.value.onConfirm!(params);
      ElMessage.success({ message: `${drawerProps.value.title}手表成功！` });
      drawerProps.value.callback!();
      visible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
