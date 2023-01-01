import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import TeamView from "../views/TeamView.vue";
import { auth } from "../firebase";

let routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter(to, from, next) {
            let user = auth.currentUser;
            if (!user) {
                next();
            } else {
                next("/dashboard");
            }
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        beforeEnter(to, from, next) {
            let user = auth.currentUser;
            if (user) {
                next();
            } else {
                next("/");
            }
        },
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
    },
    {
        path: "/projects",
        name: "projects",
        component: ProjectsView,
        beforeEnter(to, from, next) {
            let user = auth.currentUser;
            if (user) {
                next();
            } else {
                next("/");
            }
        },
    },
    {
        path: "/team",
        name: "team",
        component: TeamView,
        beforeEnter(to, from, next) {
            let user = auth.currentUser;
            if (user) {
                next();
            } else {
                next("/");
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
