import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import App from './components/App';
import homeRoutes from '@/views/home/router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {
            path: '/',
            component: App,
            redirect: '/dashboard',
            children:[
                ...homeRoutes
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    let title = to.meta.title;
    document.title = title ? `${title} - analysis` : 'analysis';

    next();
});

export default router;

