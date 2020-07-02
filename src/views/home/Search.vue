<template>
  <div class="search">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div
            v-for="(item,index) in weiboTexts"
            :key="index"
            style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #ddd;"
          >
            <h2 style="margin-bottom:10px;font-size:19px;">
              <a :href="item.url" target="_blank" style="color: #3296fa;">{{item.title}}</a>
            </h2>
            <div v-html="item.content"></div>
          </div>
          <pagination style="margin-top:20px;" v-model="page" @change="query"></pagination>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div class="item1">
            <ve-pie :data="item1Data"></ve-pie>
          </div>
          <div class="item2">
            <ve-wordcloud :data="item2Data"></ve-wordcloud>
          </div>
          <div class="item3">
            <ve-line :data="item3Data" :settings="item3Settings"></ve-line>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    this.item3Settings = {
      // yAxisName: ['hotScore','saScore'],
      axisSite: { right: ['saScore'] }
    }
    return {
      filter: null,
      eventId: null,
      loading: false,
      weiboTexts: [],
      item1Data: [],
      item2Data: [],
      item3Data: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  async created() {
    this.filter = localStorage.getItem('s_filter');
    this.loading = this.$loading({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    let ret = await ajax.post('/search', { query: this.filter });
    this.eventId = ret.event_id;
    this.init();
    this.query();
  },
  methods: {
    init() {
      ajax.get(`/search/${this.eventId}/total`).then(r => {
        this.item1Data = {
          columns: ['name', 'value'],
          rows: r
        };
        this.loading.close();
      });

      ajax.get(`/search/${this.eventId}/entities`).then(r => {
        this.item2Data = {
          columns: ['name', 'value'],
          rows: r
        };
      });

      ajax.get(`/search/${this.eventId}/timeline`).then(r => {
        this.item3Data = {
          columns: ['time', 'hotScore', 'saScore'],
          rows: r
        };
      });
    },
    query() {
      ajax.get(`/search/${this.eventId}/content/${this.page.page}/${this.page.pageSize}`).then(r => {
        this.weiboTexts = r.content;
        this.page.total = r.total;
      });
    }
  }
}
</script>

<style lang="less" scoped>
</style>