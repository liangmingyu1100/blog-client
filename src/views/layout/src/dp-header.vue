<template>
    <header class="dp-header-container">
        <NavBar>
            <template v-slot:left>
                <div class="dp-header-container-logo" @click="onLogoClick">
                    <img :src="logoUrl" alt="" />
                </div>
            </template>
            <template v-slot:right>
                <ul class="dp-header-container-controls">
                    <template v-for="(control, i) in controls" :key="i">
                        <li
                            class="dp-header-container-controls-item"
                            @click.capture="onClick(i)"
                            @mouseenter="onMouseEnter(i, $event)"
                            @mouseleave="onMouseLeave"
                            :class="
                                currentIndex === i || hoverIndex === i ? 'dp-header-container-controls-item-active' : ''
                            "
                        >
                            <FontIcon
                                :name="control.iconClass"
                                :color="currentIndex === i || hoverIndex === i ? '#1296db' : '#333'"
                                font-size="18px"
                                class="controls-item-icon"
                            />
                            <span>{{ control.name }}</span>
                        </li>
                        <li
                            class="somersault-cloud"
                            :style="{
                                width: `${somersaultCloudWidth}px`,
                                transform: `translateX(${somersaultCloudPosition}px)`,
                            }"
                            ref="somersaultCloud"
                        ></li>
                    </template>
                </ul>
            </template>
        </NavBar>
    </header>
</template>
<script setup lang="ts">
    import { nextTick, onMounted, ref, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    import logoUrl from '/@/assets/logo.png'
    const router = useRouter()
    const route = useRoute()

    const onLogoClick = () => {
        // currentIndex.value = 0
        // somersaultCloudOriginPosition.value = somersaultCloudPosition.value
        // somersaultCloudRectsX.value = (
        //     document.querySelectorAll('.dp-header-container-controls-item') as unknown as HTMLElement[]
        // )[0].getClientRects()[0].x
        // const path = controls.value[0].routePath
        router.push({ path: '/', replace: true })
    }

    const controls = ref([
        {
            name: '首页',
            routePath: '/',
            iconClass: 'home',
        },
        {
            name: '关于我',
            routePath: '/about',
            iconClass: 'timerauto',
        },
    ])
    const routerList = controls.value.map(v => v.routePath)

    watch(route, v => {
        if (!routerList.includes(v.path)) {
            somersaultCloudWidth.value = 0
            currentIndex.value = currentIndexInit()
            hoverIndex.value = currentIndexInit()
            somersaultCloudPosition.value = 0
            somersaultCloudOriginPosition.value = 0
        }
    })

    const currentIndexInit = () => {
        return controls.value.findIndex(v => {
            return v.routePath === route.path
        })
    }

    const currentIndex = ref(currentIndexInit())
    const hoverIndex = ref(currentIndexInit())
    const onClick = (i: number) => {
        currentIndex.value = i
        somersaultCloudOriginPosition.value = somersaultCloudPosition.value
        somersaultCloudRectsX.value = (
            document.querySelectorAll('.dp-header-container-controls-item') as unknown as HTMLElement[]
        )[i].getClientRects()[0].x
        const path = controls.value[i].routePath
        router.push({ path })
        // console.log(controls.value[i].routePath)
    }

    const somersaultCloudWidth = ref(0)
    const somersaultCloudPosition = ref(0)
    const somersaultCloudOriginPosition = ref(0)
    const somersaultCloudRectsX = ref(0)
    const somersaultCloud = ref({
        getClientRects: () => {
            return [{ x: 0 }]
        },
    })

    const onMouseEnter = (i: number, e: MouseEvent) => {
        // console.log('onMouseEnter')
        // console.log((e.target as any).offsetWidth)
        // console.log((e.target as any).getClientRects()[0].x)
        if (!somersaultCloudRectsX.value) {
            somersaultCloudRectsX.value = (
                document.querySelectorAll('.dp-header-container-controls-item') as unknown as HTMLElement[]
            )[0].getClientRects()[0].x
        }
        const moveX = (e.target as any).getClientRects()[0].x - somersaultCloudRectsX.value
        move(moveX)
        somersaultCloudWidth.value = (e.target as any).offsetWidth
        hoverIndex.value = i
    }

    const onMouseLeave = () => {
        reset()
    }

    const reset = () => {
        hoverIndex.value = currentIndex.value
        somersaultCloudPosition.value = somersaultCloudOriginPosition.value
        if (currentIndex.value === -1) {
            somersaultCloudWidth.value = 0
        } else {
            somersaultCloudWidth.value = (
                document.querySelectorAll('.dp-header-container-controls-item') as unknown as HTMLElement[]
            )[currentIndex.value].offsetWidth
        }
    }

    const move = (moveX: number) => {
        if (moveX === somersaultCloudPosition.value) {
            return
        }
        console.log(somersaultCloudPosition.value, 'somersaultCloudPosition')
        console.log(somersaultCloudOriginPosition.value, 'somersaultCloudOriginPosition')
        somersaultCloudPosition.value = somersaultCloudPosition.value + moveX
    }
    onMounted(() => {
        nextTick(() => {
            console.log(document.querySelector('.dp-header-container-controls-item-active'))
            somersaultCloudRectsX.value = (document.querySelector(
                '.dp-header-container-controls-item-active',
            ) as HTMLElement)
                ? (
                      document.querySelector('.dp-header-container-controls-item-active') as HTMLElement
                  ).getClientRects()[0].x
                : 0
            if (somersaultCloudRectsX.value) {
                const moveX =
                    somersaultCloudRectsX.value -
                    (document.querySelector('.dp-header-container-controls-item') as HTMLElement).getClientRects()[0].x
                move(moveX)
                somersaultCloudOriginPosition.value = moveX
            }
            console.log(somersaultCloudRectsX.value)
            // somersaultCloudRectsX.value = (
            //     document.querySelector('.dp-header-container-controls-item-active') as HTMLElement
            // ).getClientRects()[0].x
            if (!routerList.includes(route.path)) {
                somersaultCloudWidth.value = 0
            } else {
                somersaultCloudWidth.value =
                    (document.querySelector('.dp-header-container-controls-item-active') as HTMLElement).offsetWidth ??
                    70
            }
        })
    })
</script>
<style lang="scss">
    .dp-header-container {
        &-logo {
            height: 48px;
            cursor: pointer;
            > img {
                height: 100%;
            }
        }
        &-controls {
            position: relative;
            display: flex;
            &-item {
                display: flex;
                align-items: center;
                padding: 0 10px;
                cursor: pointer;
                font-size: 14px;
                &-active {
                    color: #1296db;
                }
                .controls-item-icon {
                    margin-right: 4px;
                }
            }
            .somersault-cloud {
                position: absolute;
                width: 100px;
                height: 2px;
                bottom: 0;
                transition: transform 0.6s cubic-bezier(0, 0, 0, 1.33), width 0.5s linear,
                    -webkit-transform 0.6s cubic-bezier(0, 0, 0, 1.33);
                border-radius: 4px;
                background-color: #1296db;
            }
        }
    }
</style>
