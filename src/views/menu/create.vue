<!--  -->
<template>
  <div class="menu-create">
    <create-or-edit />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import CreateOrEdit from "./component/CreateOrEdit.vue";
export default defineComponent({
  neme: "MenuCreate",
  components: {
    CreateOrEdit,
  },
});
</script>
<style lang='scss' scoped></style>
