// src/environments/production.ts
import environment from './base';
const baseApi = 'http://dynamoxapi-env-1.3skymcmvag.us-east-1.elasticbeanstalk.com/';
const env = environment(baseApi);
export default {
    ...env,
};
