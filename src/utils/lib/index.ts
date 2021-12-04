import { App } from 'vue'

export const withInstall = <T>(component: T, alias?: string) => {
    const comp = component as any
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, component)
        if (alias) {
            app.config.globalProperties[alias] = component
        }
    }
    return component as T & Plugin
}

export const getAssetsImg = (url: string) => {
    return new URL(url, import.meta.url).href
}

export const formatDate = (date: string) => {
    const format_date = new Date(date)
    const y = format_date.getFullYear()
    const m = format_date.getMonth() + 1
    const d = format_date.getDate()
    return `${y}年·${m}月${d}日`
}
