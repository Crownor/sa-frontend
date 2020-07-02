<template>
  <el-container class="global-container">
    <el-main class="global-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
}
</script>

<style lang="less" scoped>
.global-container {
  min-height: 100vh;
}
</style>