import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import authRoutes from './auth';

const routes = [
  {
	path: "/",
	name: "Home",
	component: Home,
	meta: {
		isPublic: true
	}
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory("/gsdp-ui"),
  routes,
});

export default router;
