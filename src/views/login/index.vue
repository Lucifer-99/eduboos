<template>
  <div class="login">
    <el-form
      ref="forms"
      class="login-form"
      label-position="top"
      :model="ruleform"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleform.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleform.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="onSubmit"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { login } from "@/services/user";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "LoginIndex",
  setup() {
    let loginLoading = false;
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    const ruleform = reactive({
      phone: "18201288771",
      password: "111111",
    });
    const rules = {
      phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
          pattren: /^1\d{10}$/,
          message: "请输入正确手机号",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 18,
          message: "长度在 6 到 18 个字符",
          trigger: "blur",
        },
      ],
    };
    const forms = ref();
    async function onSubmit() {
      loginLoading = true;
      if (!forms.value) return;
      try {
        await forms.value.validate();
        await login(ruleform).then((res) => {
          if (res.state !== 1) {
            ElMessage.error(res.message);
          } else {
            store.commit("setUser", res.content);
            router.push({
              name: "home",
            });
            router.push((route.query.redirect as string) || "/");
            ElMessage.success("登录成功");
          }
          loginLoading = false;
        });
      } catch (error) {}
    }
    return {
      ruleform,
      forms,
      rules,
      onSubmit,
      loginLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  background: #e8eef4;
  align-items: center;
  .login-form {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
