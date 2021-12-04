<template>
    <div class="dp-article-container-item" @click.passive="onClick(article.article_id)">
        <img class="dp-article-container-item-img" :src="article.cover_image" />
        <div class="dp-article-container-item-desc">
            <h2 class="title">{{ article.title }}</h2>
            <div class="meta">
                <time class="time">{{ formatDate(article.create_time) }}</time>
            </div>
            <el-scrollbar>
                <div class="label">
                    <span
                        class="label-item"
                        v-for="(label, i) in article.label_ids"
                        :key="i"
                        :style="{
                            background: `${formatLabel(label)?.background_color}`,
                            color: formatLabel(label)?.font_color,
                        }"
                        @click.stop
                    >
                        {{ formatLabel(label)?.label_name }}
                    </span>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { formatDate } from '/@/utils/lib/index'
    const router = useRouter()

    type Article = {
        article_id: number
        title: string
        label_ids: number[]
        cover_image: string
        create_time: string
        like_number: number
    }
    type LabelMenu = {
        label_id: number
        label_name: string
        background_color: string
        font_color: string
    }
    interface Props {
        article?: Article
        labelMenu?: LabelMenu[]
    }
    const props = withDefaults(defineProps<Props>(), {
        article: () => {
            return {} as Article
        },
        labelMenu: () => [],
    })

    // const formatDate = (date: string) => {
    //     const format_date = new Date(date)
    //     const y = format_date.getFullYear()
    //     const m = format_date.getMonth() + 1
    //     const d = format_date.getDate()
    //     return `${y}年·${m}月${d}日`
    // }

    const formatLabel = (label: number) => {
        return props.labelMenu.find(v => v.label_id === label)
    }

    const onClick = (article_id: number) => {
        router.push({ name: 'Detail', query: { article_id } })
    }
</script>
<style lang="scss" scoped>
    .dp-article-container-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-direction: column;
        border-radius: 16px;
        transition: all 0.6s;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 13px 15px rgba(31, 45, 61, 0.1);
        &-img {
            width: 100%;
            height: 255px;
            background-color: #ccc;
        }
        &-desc {
            width: 100%;
            // flex: 1;
            height: 100px;
            padding: 5px 10px;
            // background-color: #fff;
            .title {
                font-size: 18px;
                color: #000;
                /*强制文字在一行文本框内*/
                white-space: nowrap;
                /*溢出部分文字隐藏*/
                overflow: hidden;
                /*溢出部分省略号处理*/
                text-overflow: ellipsis;
            }
            .meta {
                margin-top: 2px;
                .time {
                    font-size: 12px;
                }
            }
            .label {
                display: flex;
                width: 100%;
                align-items: center;
                margin-top: 10px;
                flex-wrap: nowrap;
                &-item {
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                    margin-right: 5px;
                    // color: rgb(45, 100, 172);
                    // background-color: rgb(45, 100, 172, 0.5);
                    border-radius: 10px;
                    font-size: 14px;
                    transition: padding 0.4s;
                    &:hover {
                        padding: 0 25px;
                    }
                }
            }
        }
        &:hover {
            transform: scale(1.05);
        }
    }
</style>
