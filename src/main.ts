import { createApp } from 'vue'
import { setupRoute } from './routes'
import { setupStore } from './store'
import { setupImgLazy } from './directives/imgLazy'
import { setupI18n } from './locales/setupI18n'
import { setupElementPlugin } from './plugins/element'
import { setupMarkdownPlugin } from './plugins/markdown'
import { getAssetsImg } from '/@/utils/lib'
import App from './App.vue'
import 'vite-plugin-svg-icons/register'

import '/@/style/index.scss'

async function initApp() {
    const app = createApp(App)

    setupStore(app)

    setupRoute(app)

    await setupI18n(app)

    setupImgLazy(app, {
        loading: getAssetsImg('/src/assets/image/loading.png'),
        error: getAssetsImg('/src/assets/image/loading.png'),
    })

    setupElementPlugin(app)

    setupMarkdownPlugin(app)

    app.mount('#app')
}
initApp()
