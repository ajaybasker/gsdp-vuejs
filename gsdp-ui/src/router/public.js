const publicMeta = { meta: { isPublic: true } };

export default [
	{ path: '/about', name: 'About', component: () => import('../views/public/About.vue'), ...publicMeta },
	{ path: '/continents', name: 'Continents', component: () => import('../views/public/Continents.vue'), ...publicMeta },
	{ path: '/provinces', name: 'ProvinceDirectory', component: () => import('../views/public/ProvinceDirectory.vue'), ...publicMeta },
	{ path: '/provinces/:id', name: 'ProvinceDetail', component: () => import('../views/public/ProvinceDetail.vue'), ...publicMeta, props: true },
	{ path: '/communities', name: 'CommunityDirectory', component: () => import('../views/public/CommunityDirectory.vue'), ...publicMeta },
	{ path: '/communities/:id', name: 'CommunityDetail', component: () => import('../views/public/CommunityDetail.vue'), ...publicMeta, props: true },
	{ path: '/sectors', name: 'InstitutionDirectory', component: () => import('../views/public/InstitutionDirectory.vue'), ...publicMeta },
	{ path: '/sectors/:id', name: 'InstitutionDetail', component: () => import('../views/public/InstitutionDetail.vue'), ...publicMeta, props: true },
	{ path: '/repository-search', name: 'RepositorySearch', component: () => import('../views/public/RepositorySearch.vue'), ...publicMeta },
	{ path: '/assets/:id', name: 'PublicAssetDetail', component: () => import('../views/public/AssetDetail.vue'), ...publicMeta, props: true },
	{ path: '/collections/:id', name: 'PublicCollectionDetail', component: () => import('../views/public/CollectionDetail.vue'), ...publicMeta, props: true },
	{ path: '/news-events', name: 'NewsAndEvents', component: () => import('../views/public/NewsAndEvents.vue'), ...publicMeta },
	{ path: '/news-events/:id', name: 'EventDetail', component: () => import('../views/public/EventDetail.vue'), ...publicMeta, props: true },
	{ path: '/events/:id', redirect: (to) => `/news-events/${encodeURIComponent(to.params.id)}` },
	{ path: '/global-statistics', name: 'GlobalStatistics', component: () => import('../views/public/GlobalStatistics.vue'), ...publicMeta },
];
