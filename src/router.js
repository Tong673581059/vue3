import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/views/Home"
import HelloWorld from "@/components/HelloWorld";

const routes = [
    {
        path: "/",
        name: 'Home',
        component: Home
    },
    {
        path: "/HelloWord",
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("@/views/About")
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router