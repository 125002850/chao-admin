<template>
  <el-drawer v-model="visible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}品牌`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.disabled"
      :model="drawerProps.data"
      :hide-required-asterisk="drawerProps.disabled"
    >
      <el-form-item label="登录名称" prop="username" required>
        <el-input v-model="drawerProps.data!.username" placeholder="请填写登录名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" required>
        <el-input v-model="drawerProps.data!.phone" placeholder="请填写联系电话" clearable></el-input>
      </el-form-item>
      <el-form-item label="openId" prop="openid" required>
        <el-input v-model="drawerProps.data!.openid" placeholder="请填写微信用户openId" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属店铺" prop="shopId" required>
        <el-select v-model="drawerProps.data!.shopId" placeholder="请选择所属店铺" clearable filterable>
          <el-option v-for="item in shopOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权功能" prop="operateAuthorization" required>
        <el-select v-model="operateAuthorization" placeholder="请选择授权功能" clearable filterable multiple>
          <el-option v-for="item in operateOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="drawerProps.data.isCheck" label="密码" prop="password" required>
        <el-input
          v-model="drawerProps.data!.password"
          autocomplete="new-password"
          placeholder="请填写登录密码"
          clearable
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button v-show="!drawerProps.disabled" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="FormDrawer">
import { ref, reactive, Reactive, onMounted, computed } from "vue";
import { ElMessage, FormInstance, FormItemRule } from "element-plus";
import { Option, User } from "@/api/interface";
import { Arrayable } from "element-plus/es/utils";
import { useDrawer } from "@/hooks/useDrawer";
import { fetchShopOptions } from "@/api/modules/shop";
import { enum2Options, OperationTransform, RoleTransform } from "@/enums";

const shopOptions = ref<Option[]>();

const rules = reactive({
  username: [{ required: true, message: "请输入登录名称" }],
  phone: [{ required: true, message: "请输入联系电话" }],
  openid: [{ required: true, message: "请输入openid" }],
  shopId: [{ required: true, message: "请输入所属店铺" }],
  operateAuthorization: [{ required: true, message: "请输入授权功能" }],
  roleType: [{ required: true, message: "请输入授权角色" }],
  password: [{ required: true, message: "请输入登录密码" }]
}) satisfies Reactive<Record<string, Arrayable<FormItemRule>>>;

const { visible, acceptParams, drawerProps } = useDrawer<User.ApprovalDto & { isCheck?: boolean }>(async () => {
  shopOptions.value = (await fetchShopOptions())?.data?.map(item => ({ label: item.shopName, value: item.id }));
});

const operateAuthorization = computed({
  get() {
    return drawerProps.value.data?.operateAuthorization?.split(",")?.filter(Boolean) ?? [];
  },
  set(val) {
    drawerProps.value.data.operateAuthorization = val.toString();
  }
});

const operateOptions = ref<Option[]>(enum2Options(OperationTransform, { forceNumeric: false }));

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.onConfirm!(drawerProps.value.data);
      ElMessage.success({ message: `${drawerProps.value.title}品牌成功！` });
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
