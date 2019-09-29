export default function (baseApi) {
    return {
        api: {
            api_url: `${baseApi}/api`
        },
        isProduction: true,
        isDevelopment: false,
    };
}
