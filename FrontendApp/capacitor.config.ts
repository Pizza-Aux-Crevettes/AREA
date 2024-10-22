import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'area',
    webDir: 'www',
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
    server: {
        cleartext: true,
    },
};

export default config;
