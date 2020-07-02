const Dashboard = () => import(/*webpackChunkName:'home-chunk'*/'./Dashboard');
const Search = () => import(/*webpackChunkName:'home-chunk'*/'./Search');

let homeRoutes = [
    { path: '/dashboard', component: Dashboard, meta: { title: '首页' } },
    { path: '/search', component: Search, meta: { title: '搜索结果' } }
];

export default homeRoutes;