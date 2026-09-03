import call from '@/doppio_libs/controllers/call.js';

export const listAssets = (params) => call('gsdp.api.repository.list_assets', params);
export const getAsset = (name) => call('gsdp.api.repository.get_asset', { name });
export const listCollections = () => call('gsdp.api.repository.list_collections');
export const getCollection = (name) => call('gsdp.api.repository.get_collection', { name });
export const listResourceTypes = () => call('gsdp.api.repository.list_resource_types');
export const listCategories = () => call('gsdp.api.repository.list_categories');
