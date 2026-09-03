import './index.css';
import { createApp, reactive } from "vue";
import App from "./App.vue";

import router from './router';
import resourceManager from "./doppio_libs/resourceManager";
import call from "./doppio_libs/controllers/call";
import socket from "./doppio_libs/controllers/socket";
import Auth from "./doppio_libs/controllers/auth";

const app = createApp(App);
const auth = reactive(new Auth());

// Plugins
app.use(router);
app.use(resourceManager);

// Global Properties,
// components can inject this
app.provide("$auth", auth);
app.provide("$call", call);
app.provide("$socket", socket);


// Configure route gaurds
router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.isPublic)) {
		// It's a public page, let anyone in
		next();
	} else if (to.matched.some((record) => !record.meta.isLoginPage)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!auth.isLoggedIn) {
			next({ name: 'Login', query: { route: to.path } });
		} else {
			next();
		}
	} else {
		// It's a login page
		if (auth.isLoggedIn) {
			window.location.href = "/app"; // Already logged in, go to desk
		} else {
			next();
		}
	}
});

app.mount("#app");
