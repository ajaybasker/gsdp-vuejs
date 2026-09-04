import call from '@/doppio_libs/controllers/call.js';

export const getLoginBranding = () => call('gsdp.api.config.get_login_branding');
