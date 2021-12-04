import { i18n } from './setupI18n'
import type { LocaleType } from '../types/config'
import { useStore } from 'vuex'
import { unref } from 'vue'

interface LangModule {
    message: Recordable
}

function setI18nLanguage(locale: LocaleType) {
    const localeStore = useStore()

    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        ;(i18n.global.locale as any).value = locale
    }
    localeStore.commit('setI18nLanguage', locale)
}

export const changeLocale = async (locale: LocaleType) => {
    const globalI18n = i18n.global

    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
        return locale
    }

    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
    if (!langModule) return
    const { message } = langModule
    globalI18n.setLocaleMessage(locale, message)

    setI18nLanguage(locale)
    return locale
}
