<template>
  <el-pagination
    class="pagination"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    :page-size="page.pageSize"
    :total="page.total"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        Object.assign(this.page, val);
      }
    }
  },
  methods: {
    onSizeChange(size) {
      this.page.pageSize = size;
      this.$emit('input', this.page);
      this.$emit('change');
    },
    onCurrentChange(page) {
      this.page.page = page;
      this.$emit('input', this.page);
      this.$emit('change', this.page.page);
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: right;
}
</style>