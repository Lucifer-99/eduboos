<template>
  <div class="resource-list">
    <el-card class="box-card">
      <template #header class="clearfix">
        <el-form ref="form" :model="dataform" label-width="80px">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="dataform.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="dataform.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="dataform.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="url" width="180" label="资源路径">
        </el-table-column>
        <el-table-column prop="description" width="180" label="描述">
        </el-table-column>
        <el-table-column width="180" prop="createdTime" label="添加时间">
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page="dataform.current"
        :page-sizes="[5, 10, 20]"
        :page-size="dataform.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getResourcePages } from "@/services/resource";
import { getResourceCategories } from "@/services/resource-category";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "ResourceList",
  setup() {
    const resources = ref([]); // 资源列表
    const dataform = ref({
      name: "",
      url: "",
      current: 1, // 默认查询第1页数据
      size: 5, // 每页大小
      categoryId: null, // 资源分类
    });
    const totalCount = ref(0);
    const resourceCategories = ref([]); // 资源分类列表
    const isLoading = ref(true);
    onMounted(() => {
      loadResources();
      loadResourceCategories();
    });
    async function loadResourceCategories() {
      const { data } = await getResourceCategories();
      resourceCategories.value = data;
    }

    async function loadResources() {
      isLoading.value = true; // 展示加载中状态
      const { data } = await getResourcePages(dataform.value);
      console.log(data);
      resources.value = data.records;
      totalCount.value = data.total;
      isLoading.value = false; // 关闭加载中状态
    }

    async function onSubmit() {
      dataform.value.current = 1; // 筛选查询从第 1 页开始
      loadResources();
    }

    async function handleEdit(item: any) {
      console.log("handleEdit", item);
    }

    async function handleDelete(item: any) {
      console.log("handleDelete", item);
    }

    async function handleSizeChange(val: number) {
      console.log(val);
      dataform.value.size = val;
      dataform.value.current = 1; // 每页大小改变重新查询第1页数据
      loadResources();
    }

    async function handleCurrentChange(val: number) {
      // 请求获取对应页码的数据
      console.log(val);
      dataform.value.current = val; // 修改要查询的页码
      console.log(dataform);
      loadResources();
    }
    const form = ref();
    async function onReset() {
      await form.value.resetFields();
      dataform.value.current = 1; // 重置回到第1页
      loadResources();
    }
    return {
      resources,
      dataform,
      totalCount,
      resourceCategories,
      isLoading,
      onSubmit,
      onReset,
      handleSizeChange,
      handleCurrentChange,
      handleEdit,
      handleDelete,
      form,
    };
  },
});
</script>

<style lang="scss" scoped></style>
