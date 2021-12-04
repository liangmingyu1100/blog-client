import type { VNodeChild, PropType as VuePropType } from 'vue'

declare global {
    const __APP_INFO__: {
        pkg: {
            name: string
            version: string
            dependencies: Recordable<string>
            devDependencies: Recordable<string>
        }
        lastBuildTime: string
    }
    // declare interface Window {
    //   // Global vue app instance
    //   __APP__: App<Element>;
    // }

    // vue
    type PropType<T> = VuePropType<T>
    type VueNode = VNodeChild | JSX.Element

    export type Writable<T> = {
        -readonly [P in keyof T]: T[P]
    }
    declare interface ViteEnv {
        VITE_PORT: number
        VITE_USE_MOCK: boolean
        VITE_USE_PWA: boolean
        VITE_PUBLIC_PATH: string
        VITE_PROXY: [string, string][]
        VITE_GLOB_APP_TITLE: string
        VITE_GLOB_APP_SHORT_NAME: string
        VITE_USE_CDN: boolean
        VITE_DROP_CONSOLE: boolean
        VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
        VITE_LEGACY: boolean
        VITE_USE_IMAGEMIN: boolean
        VITE_GENERATE_UI: string
    }
    type Nullable<T> = T | null
    type Recordable<T = any> = Record<string, T>
}
