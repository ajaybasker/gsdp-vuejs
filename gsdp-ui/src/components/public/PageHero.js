// Same-hue from/to pairs — renders as a flat solid fill wherever consumed via
// `bg-gradient-to-br ${gradient}`, without touching every call site individually.
export const ACCENTS = [
	'from-brand-600 to-brand-700',
	'from-sand-500 to-amber-600',
	'from-teal-600 to-teal-700',
	'from-emerald-600 to-emerald-700',
	'from-sky-600 to-sky-700',
	'from-violet-600 to-violet-700',
	'from-rose-600 to-rose-700',
];

const SOFT_BG = [
	'bg-brand-50/70 border-brand-100',
	'bg-sand-50/70 border-sand-100',
	'bg-teal-50/70 border-teal-100',
	'bg-emerald-50/70 border-emerald-100',
	'bg-sky-50/70 border-sky-100',
	'bg-violet-50/70 border-violet-100',
	'bg-rose-50/70 border-rose-100',
];

export function accentFor(index) {
	return ACCENTS[index % ACCENTS.length];
}

export function softFor(gradient) {
	const idx = ACCENTS.indexOf(gradient);
	return SOFT_BG[idx === -1 ? 0 : idx];
}
