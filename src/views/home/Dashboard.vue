<template>
  <div class="dashboard">
    <h2 class="title">UCAS Weibo Analysis</h2>
    <div class="inner">
      <el-autocomplete
        v-model="filter"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        class="search-input"
      ></el-autocomplete>
      <el-button type="primary" icon="el-icon-search" class="search-btn" @click="onSearch">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: null
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {

      if (!queryString) {
        ajax.get('/search/history').then(r => {
          let m = [];
          r.map(v => {
            m.push({
              value: v
            });
          });
          cb(m)
        });
      } else {
        ajax.post('/search/candidate', {query: queryString}).then(r => {
          let m = [];
          r.candidate.map(v => {
            m.push({
              value: v
            });
          });
          cb(m)
        });
      }
    },
    handleSelect(item) {
      this.filter = item.value;
    },
    onSearch(){
      if(this.filter){
        this.$router.push(`/search/${this.filter}`);
      }else{
        this.$message.error('请输入搜索词');
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  margin-top: 100px;
  .title {
    text-align: center;
    margin-bottom: 30px;
    color: #0286fc;
    font-size: 36px;
  }
  .inner {
    display: flex;
    justify-content: center;

    .search-input {
      width: 500px;
      margin-right: 20px;
    }
  }
}
</style>