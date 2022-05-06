/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');
const nextConfig = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER){
        return {
            env: {
                mongodb_username: 'mohammad',
                mongodb_password: 'mohammad0',
                mongodb_clusterName: 'cluster0',
                mongodb_database: 'myFirstDatabase-dev'
            }
        }
    }
    return {
        eslint: {
            // Warning: This allows production builds to successfully complete even if
            // your project has ESLint errors.
            ignoreDuringBuilds: true
        },
        reactStrictMode: true,
        env: {
            mongodb_username: 'mohammad',
            mongodb_password: 'mohammad0',
            mongodb_clusterName: 'cluster0',
            mongodb_database: 'myFirstDatabase'
        }
    }

}

module.exports = nextConfig
