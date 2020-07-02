<template>
  <div class="page-container">
    <div v-if="showHeader" class="header flex-between-center">
      <slot name="header"></slot>
    </div>
    <div class="content" :style="{backgroundColor:backgroundColor,padding:padding}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    padding: {
      type: String,
      default: '20px 12px'
    }
  },
  data() {
    return {
      hi: '你好'
    };
  },
  created(){
  }
};
</script>

<style lang="less" scoped>
.page-container {
  .header {
    background-color: #fff;
    padding: 12px 16px;
    border-bottom: 1px solid #e8e8e8;
  }

  .content {
    margin: 15px;
  }
}
</style>