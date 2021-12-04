import { i18n } from '/@/locales/setupI18n'

type I18nTranslationRestParameters = [string, any]

export function useI18n() {
    const { t, ...methods } = i18n.global
    const tFn = (key: string, ...agr: any[]) => {
        if (!key) return ''
        return t(key, ...(agr as I18nTranslationRestParameters))
    }
    return {
        ...methods,
        t: tFn,
    }
}
