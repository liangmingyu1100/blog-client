import { App } from 'vue'
import { createStore } from 'vuex'
import JSCookie from 'js-cookie'
import { CookieKey } from '../constant/storageKey'

import getters from './getters'
import mutations from './mutations'

export interface AppState {
    locale: string
    locales: string[]
}

const store = createStore<AppState>({
    state() {
        return {
            locale: JSCookie.get(CookieKey.Current_Locale_key) || 'zh_CN',
            locales: ['zh_CN', 'en'],
        }
    },
    getters,
    mutations,
})

export function setupStore(app: App) {
    app.use(store)
}

export { store }
