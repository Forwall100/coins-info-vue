import { createRouter, createWebHashHistory } from "vue-router";
import TheHome from "./pages/TheHome.vue"
import TheSearchPage from "./pages/TheSearchPage.vue"
import TheCoin from "./pages/TheCoin.vue"

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: TheHome},
        {path: '/search', component: TheSearchPage},
        {path: '/coin/:id', component: TheCoin}
    ]
})