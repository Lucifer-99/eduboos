<template>
  <div class="menu">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            plain
            @click="$router.push({ name: 'menu-create' })"
            type="primary"
            >添加</el-button
          >
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)"
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
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getAllmenus, deleteMenus } from "@/services/menu";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MenuIndex",
  setup() {
    const router = useRouter();
    const tableData = ref([]);
    onMounted(() => {
      loadAllMenus();
    });
    function loadAllMenus() {
      getAllmenus().then((res) => {
        console.log(res);
        if (res.code === "000000") {
          tableData.value = res.data;
        }
      });
    }
    function handleEdit(id: number) {
      router.push({
        name: "menu-edit",
        params: { id },
      });
    }
    function handleDelete(item: any) {
      console.log("删除", item);
      ElMessageBox.confirm("确认删除吗", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          if (item.id != null) {
            await deleteMenus(item.id as number).then((res) => {
              if (res.code === "000000") {
                ElMessage.success("删除成功");
                loadAllMenus();
              }
            });
          }
        })
        .catch(() => {
          ElMessage.info("已取消删除");
        });
    }
    return {
      tableData,
      handleEdit,
      handleDelete,
      loadAllMenus,
    };
  },
});
</script>

<style lang="scss" scoped></style>
