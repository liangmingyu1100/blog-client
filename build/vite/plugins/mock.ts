import { viteMockServe } from 'vite-plugin-mock'
export function configMockPlugin(isBuild: boolean) {
    return viteMockServe({
        mockPath: 'mock', //默认地址 与node_modules同级目录
        supportTs: true, // 支持TS
        localEnabled: !isBuild,
        prodEnabled: isBuild,
    })
}
