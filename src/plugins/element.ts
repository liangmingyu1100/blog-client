import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { App } from 'vue'
export function setupElementPlugin(app: App) {
    app.use(ElementPlus, {
        locale: zhCn,
    })
}
