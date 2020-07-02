import './global';

import Vue from 'vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import plugins from './plugins';
import components from '@/components';
import VCharts from 'v-charts';
Vue.use(VCharts);
Vue.use(ElementUI);
Vue.use(plugins);
Vue.use(components);


import '../assets/less/global.less';

import mixins from './mixins';
Vue.mixin(mixins);

new Vue({
    el: '#app',
    router,
    store,
    template: '<router-view></router-view>'
});