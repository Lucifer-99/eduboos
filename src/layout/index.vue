<template>
  <div class="layout">
    <h2>头部</h2>
    <h2>侧边栏</h2>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  neme: "LayoutIndex",
});
</script>

<style lang="scss" scoped></style>
