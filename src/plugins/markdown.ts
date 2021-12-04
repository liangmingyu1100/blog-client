import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html'
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import { App } from 'vue'

import '@kangc/v-md-editor/lib/style/preview-html.css'
// 引入使用主题的样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

export function setupMarkdownPlugin(app: App) {
    app.use(VMdPreviewHtml)
}
