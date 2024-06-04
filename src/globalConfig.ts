type TConfig = {
    apiAuthServiceAddress: string,
    entrypointServiceNginxAddress: string
}

declare global {
    interface Window {
        SERVER_ENV: any
    }
}

export const GLOBAL_CONFIG: TConfig = {
    apiAuthServiceAddress: window.SERVER_ENV?.VITE_APP_API_AUTH_SERVICE_ADDRESS || import.meta.env.VITE_APP_API_AUTH_SERVICE_ADDRESS,
    entrypointServiceNginxAddress: window.SERVER_ENV?.VITE_APP_ENTRYPOINT_SERVICE_NGINX_ADDRESS || import.meta.env.VITE_APP_ENTRYPOINT_SERVICE_NGINX_ADDRESS,
}
