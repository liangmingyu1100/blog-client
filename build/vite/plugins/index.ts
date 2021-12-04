import type { Plugin } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

import { configHtmlPlugin } from './html'
import { configSvgIconPlugin } from './svgIcon'
import { configCompressPlugin } from './compress'
import { configMockPlugin } from './mock'
import { configOnDemandImportPlugin } from './unplugin-vue-components'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]
    const { VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, VITE_USE_MOCK } = viteEnv

    VITE_LEGACY &&
        isBuild &&
        vitePlugins.push(
            legacy({
                targets: [
                    'Android > 39',
                    'Chrome >= 60',
                    'Safari >= 10.1',
                    'iOS >= 10.3',
                    'Firefox >= 54',
                    'Edge >= 15',
                ],
            }),
        )

    vitePlugins.push(configSvgIconPlugin(isBuild))

    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

    isBuild && vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))

    vitePlugins.push(configOnDemandImportPlugin())

    return vitePlugins
}
