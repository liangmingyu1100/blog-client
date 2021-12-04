import { AppState } from '.'
import { LocaleType } from '../types/config'
import { CookieKey } from '../constant/storageKey'
import jsCookie from 'js-cookie'
export default {
    changeLocale(state: AppState, locale: LocaleType) {
        if (state.locales.includes(locale)) {
            state.locale = locale
            jsCookie.set(CookieKey.Current_Locale_key, locale)
        }
    },
}
