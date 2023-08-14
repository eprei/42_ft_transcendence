import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    // Use the environment variables in your Vite config
    return {
        plugins: [react()],
        server: {
            host: true,
            strictPort: true,
            port: 5173,
        },
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
    }
})
