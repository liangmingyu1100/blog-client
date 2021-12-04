<template>
    <article class="dp-article-container">
        <template v-for="(article, i) in articles" :key="i">
            <ArticleContentItem :article="article" :labelMenu="labelMenu" />
        </template>
        <template v-if="placeholderVisible">
            <ArticleContentItem :style="{ opacity: 0 }" v-for="v in 5 - props.articles.length" :key="v" />
        </template>
        <div class="pagination-wrapper">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @prev-click="onPageChange"
                @next-click="onPageChange"
                @current-change="onPageChange"
            />
        </div>
    </article>
</template>
<script setup lang="ts">
    import { computed } from 'vue'

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
        articles?: Article[]
        pageSize?: number
        total?: number
        labelMenu?: LabelMenu[]
    }
    const props = withDefaults(defineProps<Props>(), {
        articles: () => [],
        pageSize: 12,
        total: 10,
        labelMenu: () => [],
    })
    const emits = defineEmits(['change'])
    const placeholderVisible = computed(() => {
        return props.articles.length && props.articles.length <= 4
    })

    const onPageChange = (page: number) => {
        console.log(page)
        emits('change', page)
    }
</script>
<style lang="scss" scoped>
    .dp-article-container {
        flex: 1;
        // height: calc(100% - 56px);
        // overflow: auto;
        display: grid;
        grid-template-columns: repeat(4, calc((100% - 90px) / 4));
        gap: 30px;
        padding-top: 24px;
        padding-left: 20px;
        padding-bottom: 50px;
        // background-color: pink;
    }

    .pagination-wrapper {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
    }
</style>
