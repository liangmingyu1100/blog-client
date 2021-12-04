import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export function configOnDemandImportPlugin() {
    const onDemandImportPlugin = Components({
        resolvers: [ElementPlusResolver()],
        dts: true,
    })

    return onDemandImportPlugin
}
