<template>
  <div class="tags-list">
    <el-tag
      v-for="(tag, idx) in tags"
      :key="tag.id"
      :closable="!disabled"
      checked
      :disable-transitions="false"
      :style="{ order: idx, display: editTag === tag ? 'none' : 'inline-flex' }"
      @click="handleEdit(tag, idx)"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model.trim="inputValue"
      size="small"
      :style="{ order: editTag ? editIdx : 9999 }"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput"> + </el-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useId } from "vue";
import { ElInput } from "element-plus";
import type { InputInstance } from "element-plus";

type Tag = {
  name?: string;
  id?: string;
};
const tags = defineModel<Tag[]>({ required: true });
const props = defineProps<{ disabled: boolean }>();

const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref<InputInstance>();
const editTag = ref<Tag>();

const editIdx = computed(() => tags.value.indexOf(editTag.value!));

const isEdit = computed(() => editTag.value);

const handleEdit = (tag: Tag, idx: number) => {
  if (props.disabled) return;
  editTag.value = tag;
  inputValue.value = tags.value[idx].name ?? "";
  showInput();
};

const handleClose = (tag: Tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    if (isEdit.value) {
      editTag.value!.name = inputValue.value;
    } else {
      tags.value.push({ name: inputValue.value, id: useId() });
    }
  }
  inputVisible.value = false;
  inputValue.value = "";
  editTag.value = void 0;
};
</script>

<style lang="scss" scoped>
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .el-input {
    width: 80px;
  }

  .el-button {
    order: 9999;
  }
}
</style>
