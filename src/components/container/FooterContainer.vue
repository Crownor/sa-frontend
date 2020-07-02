<template>
  <div class="footer-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  destroyed() {
    this.remove();
  },
  methods: {
    init() {
      let mainContainer = document.querySelector('.main-container');
      mainContainer.appendChild(this.$el);
    },
    remove() {
      let mainContainer = document.querySelector('.main-container');
      mainContainer.removeChild(this.$el);
    }
  }
}
</script>

<style>
.footer-container {
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
}
</style>