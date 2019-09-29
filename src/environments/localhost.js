import environment from './base';
const baseApi = 'http://192.168.0.10:5000';
const env = environment(baseApi);
export default {
    ...env,
    isProduction: false,
    isDevelopment: true,
};
