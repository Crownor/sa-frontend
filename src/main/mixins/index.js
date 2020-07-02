import { mapGetters } from 'vuex';

export default {
    data(){
        return {
        };
    },
    filters: {
        fromNow(val) {
            return moment(val).fromNow();
        },
        format(val, fmt) {
            if (!val) return '--';
            return moment(val).format(fmt || "YYYY-MM-DD HH:mm");
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods:{
        transformPage(page){
            let ret = {
                skipCount: (page.page-1)*page.pageSize,
                maxResultCount: page.pageSize
            };
            return ret;
        }
    }
};