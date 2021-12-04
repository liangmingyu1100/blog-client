import { Router } from 'vue-router'
import registerTitleGuard from './titleGuard'
export default function setupRouterGuard(router: Router) {
    registerTitleGuard(router)
}
