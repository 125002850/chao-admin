<template>
  <!-- 分页组件 -->
  <el-pagination
    :background="true"
    :current-page="pageable.currPage"
    :page-size="pageable.pageNum"
    :page-sizes="[10, 25, 50, 100]"
    :total="pageable.total"
    :size="globalStore?.assemblySize ?? 'default'"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
import { useGlobalStore } from "@/stores/modules/global";
const globalStore = useGlobalStore();

interface Pageable {
  currPage: number;
  pageNum: number;
  total: number;
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
