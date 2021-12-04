import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

import { createVitePlugins } from './build/vite/plugins'
import { wrapperEnv } from './build/utils'
function pathResolve(path: string) {
    return resolve(process.cwd(), path)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const root = process.cwd()

    const env = loadEnv(mode, root)

    const viteEnv = wrapperEnv(env)

    const isBuild = command === 'build'

    return {
        resolve: {
            base: './',
            root,
            publicDir: 'public',
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
                // /#/xxxx => types/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        server: {
            //服务器主机名
            host: '0.0.0.0',
            //端口号
            port: 3088,
            //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
            strictPort: false,
            //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
            open: false,
            //自定义代理规则
            proxy: {
                // 选项写法
                '/api': {
                    target: 'http://jsonplaceholder.typicode.com',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                },
            },
        },
        plugins: createVitePlugins(viteEnv, isBuild),
        build: {
            sourcemap: viteEnv.VITE_APP_ENV === 'dev' ? true : false,
        },
    }
})
