/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import SvgIconsPlugin from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconPlugin(isBuild: boolean) {
    const svgIconConfig = SvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        svgoOptions: isBuild,
        symbolId: 'icon-[name]',
    })

    return svgIconConfig
}
