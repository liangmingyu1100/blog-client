import type { Router } from 'vue-router'

export default function registerTitleGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        if (to.meta?.title) {
            document.title = to.meta?.title as string
        }
        next()
    })
}
