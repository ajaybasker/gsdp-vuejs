import { onBeforeUnmount, onMounted, ref } from 'vue';

// One-shot IntersectionObserver: fires `inView.value = true` once the bound element enters the
// viewport, then disconnects — a reveal trigger, not a continuous visibility tracker. Mirrors the
// source React `useInView` hook's contract.
export function useInView(options = {}) {
	const elRef = ref(null);
	const inView = ref(false);
	let observer;

	onMounted(() => {
		if (!elRef.value) return;
		observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				inView.value = true;
				observer.disconnect();
			}
		}, { threshold: 0.15, ...options });
		observer.observe(elRef.value);
	});

	onBeforeUnmount(() => {
		observer?.disconnect();
	});

	return { elRef, inView };
}
