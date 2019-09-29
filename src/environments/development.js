import environment from './base';
//const baseApi = 'https://nicaf-nodejs.herokuapp.com';
const baseApi = 'http://dynamoxapi-env-1.3skymcmvag.us-east-1.elasticbeanstalk.com/';
const env = environment(baseApi);
export default {
    ...env,
    isProduction: false,
    isDevelopment: true,
};
