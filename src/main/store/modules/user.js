// import ajax from "../../global/ajax";

export default {
    state: {
        user: JSON.parse(localStorage.getItem('login_user')) || {},
        roles: null,
    },
    mutations: {
        login(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = {};
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    }
};