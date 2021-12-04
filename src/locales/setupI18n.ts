import { App } from '@vue/runtime-core'
import type { I18n, I18nOptions } from 'vue-i18n'
import { store } from '../store'
import { useI18n } from '/@/hooks/useI18n'
import { createI18n } from 'vue-i18n'
export let i18n: ReturnType<typeof createI18n>
export async function createI18nOption(): Promise<I18nOptions> {
    const locale = store.getters.getLocale || 'zh_CN'
    const defaultLocal = await import(`./lang/${locale}.ts`)
    const message = defaultLocal.default?.message ?? {}
    console.log(defaultLocal.default)

    console.log(message)
    return {
        legacy: false,
        locale,
        fallbackLocale: 'zh_CN',
        messages: {
            [locale]: message,
        },
        availableLocales: ['zh_CN', 'en'],
        sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
        silentTranslationWarn: true, // true - warning off
        missingWarn: false,
        silentFallbackWarn: true,
    }
}

export async function setupI18n(app: App) {
    const options = await createI18nOption()
    i18n = createI18n(options) as I18n
    const { t } = useI18n()
    app.config.globalProperties.$t = t // 全局挂载
    app.use(i18n)
}
