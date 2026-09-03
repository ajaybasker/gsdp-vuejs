import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/public/Home.vue";
import PortalShell from "../views/PortalShell.vue";
import GlobalDashboard from "../views/GlobalDashboard.vue";
import authRoutes from './auth';
import publicRoutes from './public';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      isPublic: true
    }
  },
  ...publicRoutes,
  {
    path: "/app",
    component: PortalShell,
    children: [
      {
        path: "global-dashboard",
        name: "GlobalDashboard",
        component: GlobalDashboard
      },
      {
        path: "",
        redirect: "/app/global-dashboard"
      }
    ]
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory("/gsdp-ui"),
  routes,
});

export default router;
