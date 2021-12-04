<template>
    <main class="dp-main-container">
        <AsideBar :recommandMenu="recommandMenu" :labelMenu="labelMenu" @switch="switchLabel" />
        <ArticleContent
            :articles="articleList"
            @change="onPageChange"
            :page-size="limit"
            :total="articleTotal"
            :labelMenu="labelMenu"
        />
    </main>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    import { fetchHomePage } from '/@/api/home'
    const page = 1
    const limit = 12
    const articleTotal = ref(0)
    const recommandMenu = ref([])
    const labelMenu = ref([])
    const articleList = ref([])
    const currentLabel = ref(sessionStorage.getItem('label') ? Number(sessionStorage.getItem('label')) : 999)

    if (sessionStorage.getItem('label')) {
        sessionStorage.removeItem('label')
    }

    const fetchHomePageData = ({ page, limit, label_id }: { page: number; limit: number; label_id: number }) => {
        fetchHomePage({ page, limit, label_id }).then(res => {
            const { data } = res
            const { labels, recommendLabels, articles, total } = data
            recommandMenu.value = recommendLabels
            labelMenu.value = labels
            articleList.value = articles
            articleTotal.value = total
        })
    }

    fetchHomePageData({ page, limit, label_id: currentLabel.value })
    const switchLabel = (label_id: number) => {
        currentLabel.value = label_id
        fetchHomePageData({ page, limit, label_id: currentLabel.value })
    }
    const onPageChange = (p: number) => {
        console.log(p)
        fetchHomePageData({ page: p, limit, label_id: currentLabel.value })
    }
</script>
<style lang="scss" scoped>
    .dp-main-container {
        position: relative;
        display: flex;
        padding: 56px 40px 0;
        min-height: 100vh;
    }
</style>
