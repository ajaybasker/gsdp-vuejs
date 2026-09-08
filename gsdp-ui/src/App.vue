<template>
	<div id="app" class="min-h-screen text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
		<router-view />
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getLoginBranding } from '@/api/config.js';

onMounted(async () => {
	try {
		const branding = await getLoginBranding();
		if (branding?.login_page_icon) {
			setFavicon(branding.login_page_icon);
		}
	} catch {
		// keep default static favicon on failure
	}
});

function setFavicon(url) {
	let link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	link.type = '';
	link.href = url;
}
</script>
