import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import setupRouterGuard from './guard'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('/@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'Index',
                component: () => import('/@/views/home/index.vue'),
                meta: {
                    title: 'Dogger的bo客',
                },
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('/@/views/about/index.vue'),
            },
            {
                path: '/detail',
                name: 'Detail',
                component: () => import('/@/views/detail/index.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export function setupRoute(app: App) {
    app.use(router)
}

setupRouterGuard(router)

export default router
