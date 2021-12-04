<template>
    <aside class="dp-aside-container">
        <ul class="dp-aside-container-menu-recommand">
            <li
                class="dp-aside-container-menu-item"
                v-for="(item, i) in recommandMenu"
                :key="i"
                @mouseenter="onHover(i)"
                @mouseleave="onLeave"
                @click="onClick(item.label_id, i)"
                :class="{ active: i === currentIndex }"
            >
                <SvgIcon
                    :icon-class="hoverIndex === i || currentIndex === i ? `${item.label_icon}-active` : item.label_icon"
                />
                <span class="dp-aside-container-menu-item-text">{{ item.label_name }}</span>
            </li>
        </ul>
        <ul class="dp-aside-container-menu-nav">
            <li
                class="dp-aside-container-menu-item"
                v-for="(item, i) in labelMenu"
                :key="i"
                @mouseenter="onHover(i + recommandMenu.length)"
                @mouseleave="onLeave"
                @click="onClick(item.label_id, i + recommandMenu.length)"
                :class="{ active: i + recommandMenu.length === currentIndex }"
            >
                <SvgIcon
                    :icon-class="
                        hoverIndex === i + recommandMenu.length || currentIndex === i + recommandMenu.length
                            ? `${getSvgIcon(item.label_name)}-active`
                            : getSvgIcon(item.label_name)
                    "
                />
                <span class="dp-aside-container-menu-item-text">{{ item.label_name }}</span>
            </li>
        </ul>
    </aside>
</template>
<script setup lang="ts">
    import { ref } from 'vue'

    type RecommandMenu = {
        label_id: number
        label_name: string
        label_icon: string
    }
    type LabelMenu = {
        label_id: number
        label_name: string
    }
    interface Props {
        recommandMenu?: RecommandMenu[]
        labelMenu?: LabelMenu[]
    }

    const props = withDefaults(defineProps<Props>(), {
        recommandMenu: () => [],
        labelMenu: () => [],
    })

    const emits = defineEmits(['switch'])

    const currentIndex = ref(0)
    const hoverIndex = ref(0)
    const onClick = (label_id: number, i: number) => {
        emits('switch', label_id)
        currentIndex.value = i
    }

    const onHover = (i: number) => {
        hoverIndex.value = i
    }

    const onLeave = () => {
        hoverIndex.value = currentIndex.value
    }

    const getSvgIcon = (label: string) => {
        const svgModules = import.meta.globEager('/src/assets/icons/svg/*.svg')
        const svgFilePathList = Object.keys(svgModules)
        const svgFileNameList = svgFilePathList.map(v => {
            const lastIndex = v.lastIndexOf('/')
            const dotIndex = v.indexOf('.')
            return v.substring(lastIndex + 1, dotIndex)
        })
        // console.log(svgFileNameList)
        if (svgFileNameList.includes(label)) {
            return label
        } else {
            return 'other'
        }
    }
</script>
<style lang="scss" scoped>
    .dp-aside-container {
        position: sticky;
        top: 56px;
        width: 160px;
        height: calc(100% - 56px);
        overflow: auto;
        padding: 10px 10px 10px 0;
        // background-color: pink;
        &-menu-recommand {
            border-bottom: 1px solid #333;
        }
        &-menu-item {
            display: flex;
            align-items: center;
            height: 38px;
            line-height: 38px;
            margin: 15px 0;
            padding: 0 15px;
            font-size: 20px;
            border-radius: 20px;
            border: 1px solid transparent;
            background-color: white;
            cursor: pointer;
            &-text {
                font-size: 14px;
                margin-left: 6px;
            }
            &:hover {
                border-color: #1296db;
            }
        }
        .active {
            border-color: #1296db;
        }
    }
</style>
