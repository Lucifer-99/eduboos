<!--  -->
<template>
  <div class="menu-create">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? "编辑菜单" : "添加菜单" }}</span>
        </div>
      </template>
      <el-form ref="form" :rules="rules" :model="ruleform" label-width="100px">
        <el-form-item label="菜单名称：" prop="name">
          <el-input v-model="ruleform.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径：" prop="href">
          <el-input v-model="ruleform.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：" prop="parentId">
          <el-select v-model="ruleform.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in parentMenuList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="ruleform.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标：">
          <el-input v-model="ruleform.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="ruleform.shown">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="ruleform.orderNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import { createOrUpdateMenu, getEditMenuInfo } from "@/services/menu";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
export default defineComponent({
  neme: "MenuCreate",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const parentMenuList = ref([]);
    const ruleform = ref({
      name: "",
      href: "",
      parentId: "",
      description: "",
      icon: "",
      shown: false,
      orderNum: 0,
    });
    const rules = {
      name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
      href: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
      parentId: [
        { required: true, message: "请选择上级菜单", trigger: "change" },
      ],
    };
    onMounted(async () => {
      await getEditMenuInfo(route.params.id || -1).then((res) => {
        if (res.data.menuInfo) {
          ruleform.value = res.data.menuInfo;
        }
        if (res.code === "000000") {
          parentMenuList.value = res.data.parentMenuList;
        }
      });
    });

    const form = ref();
    async function onSubmit() {
      if (!form.value) return;
      try {
        await form.value.validate();
        await createOrUpdateMenu(ruleform.value).then((res) => {
          if (res.code === "000000") {
            ElMessage.success("创建成功");
          }
        });
      } catch (error) {}
    }
    return {
      ruleform,
      onSubmit,
      rules,
      form,
      parentMenuList,
    };
  },
});
</script>
<style lang='scss' scoped></style>
