import environment from './base';
const baseApi = 'http://localhost:5001';
const env = environment(baseApi);
export default {
    ...env,
    isProduction: false,
    isDevelopment: true,
};
