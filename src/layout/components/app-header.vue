<!--  -->
<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="userInfo.portrait || defaultImg"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item command="logout" @click="handleLogout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import { getUserInfo } from "@/services/user";
import defaultImg from "@/assets/images/defaultHeader.png";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
  neme: "Appheader",
  setup() {
    const userInfo = ref({});
    const store = useStore();
    const router = useRouter();
    console.log(userInfo, 1);
    onMounted(() => {
      loadUserInfo();
    });
    async function loadUserInfo() {
      await getUserInfo().then((res) => {
        userInfo.value = res.content;
        console.log(userInfo, 2);
      });
    }
    function handleLogout() {
      console.log(1);
      ElMessageBox.confirm("确认退出吗", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          // 清除登录状态
          store.commit("serUser", null);
          // 返回登录页
          router.push({ name: "login" });
          ElMessage({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消退出",
          });
        });
    }
    return {
      loadUserInfo,
      userInfo,
      defaultImg,
      handleLogout,
    };
  },
});
</script>
<style lang='scss' scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
