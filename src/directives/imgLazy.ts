import { useIntersectionObserver } from '@vueuse/core'
import { App } from 'vue'

function registerImgLazy(app: App, options: Recordable) {
    const { loading, error } = options

    app.directive('lazy', {
        mounted(el, binding) {
            el.src = loading || ''
            const { stop } = useIntersectionObserver(
                el,
                ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        el.onerror = () => {
                            el.src = error || ''
                        }
                        stop() // 监听到可见区域 下次不在执行监听
                        el.src = binding.value
                    }
                },
                { threshold: 0 },
            )
        },
    })
}

export function setupImgLazy(app: App, options: Recordable) {
    app.use(registerImgLazy, options)
}
