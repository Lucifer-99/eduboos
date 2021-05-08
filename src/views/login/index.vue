<template>
  <div class="login">
    <el-form
      ref="forms"
      class="login-form"
      label-position="top"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref } from "vue";
import { login } from "@/services/user";
import { ElForm } from "element-plus";
export default defineComponent({
  name: "LoginIndex",
  setup() {
    const form = reactive({
      phone: "",
      password: "",
    });
    const forms = ref();
    console.log(forms);
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
    const onSubmit = async () => {
     console.log(2);
    };
    return {
      form,
      forms,
      rules,
      onSubmit,
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
