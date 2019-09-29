// src/environments/production.ts
import environment from './base';
const baseApi = 'http://dynamoxapi.us-east-1.elasticbeanstalk.com/';
const env = environment(baseApi);
export default {
    ...env,
};
