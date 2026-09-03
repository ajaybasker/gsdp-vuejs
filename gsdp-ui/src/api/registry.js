import call from '@/doppio_libs/controllers/call.js';

export const getCounts = () => call('gsdp.api.registry.get_counts');
export const listCountries = () => call('gsdp.api.registry.list_countries');
export const listActivityCategories = () => call('gsdp.api.registry.list_activity_categories');
export const getMapPoints = () => call('gsdp.api.registry.get_map_points');
export const listOrgUnits = (params) => call('gsdp.api.registry.list_org_units', params);
export const getOrgUnit = (doctype, name) => call('gsdp.api.registry.get_org_unit', { doctype, name });
export const getChildren = (doctype, name) => call('gsdp.api.registry.get_children', { doctype, name });
export const getSectorCounts = () => call('gsdp.api.registry.get_sector_counts');
export const getCommunityCountsByProvince = () => call('gsdp.api.registry.get_community_counts_by_province');
export const listEvents = (params) => call('gsdp.api.registry.list_events', params);
