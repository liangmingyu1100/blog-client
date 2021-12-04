<template>
    <div class="dp-detail-container">
        <el-affix target=".dp-detail-container" class="like-icon" position="top" :offset="110">
            <SvgIcon :icon-class="likeSvgIcon" @click="onLike" />
            <span class="like-icon-text">
                {{ meta.like_number }}
            </span>
        </el-affix>
        <div class="dp-detail-container-header">
            <div class="dp-detail-container-header-meta">
                <h1 :style="{ color: '#0c0c0c' }">{{ meta.title }}</h1>
                <div class="msg">
                    <span class="dp-author-name">{{ meta.author_name }}</span>
                    <span class="dp-create-time">{{ formatDate(meta.create_time) }}</span>
                </div>
                <span class="dp-label-wrapper">
                    <template v-for="(item, i) in meta.label_ids" :key="i">
                        <em @click="onClick(item)" class="dp-label-wrapper-item">
                            {{ parseLabels(item) }}
                        </em>
                        <template v-if="i !== meta.label_ids.length - 1">
                            <span :style="{ margin: '0 3px' }">·</span>
                        </template>
                    </template>
                </span>
            </div>
        </div>
        <div class="dp-detail-container-content">
            <v-md-preview-html :html="meta.content_html" preview-class="vuepress-markdown-body" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import { debounce } from 'lodash'
    import { computed, ref, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { fetchArticleDetailInfo, fetchLabels, likeArticleByArticleId } from '/@/api/detail'
    import { formatDate } from '/@/utils/lib/index'

    const route = useRoute()
    const router = useRouter()
    const currentActicleId = computed(() => {
        return route.query.article_id as string
    })
    const meta = ref<any>({})
    const labelInfo = ref<any>([])
    fetchArticleDetailInfo({ article_id: Number(currentActicleId.value) }).then(res => {
        console.log(res)
        const { data } = res
        const { create_time, like_number, content, content_html, label_ids, title, author_name } = data
        meta.value = {
            create_time,
            like_number,
            title,
            author_name,
            content_html,
            label_ids,
        }
    })

    fetchLabels().then(res => {
        console.log(res)
        const { data } = res
        const { labels } = data
        labelInfo.value = labels
    })

    const parseLabels = (label_id: number) => {
        return (
            labelInfo.value.find((v: { label_id: number }) => {
                return v.label_id === label_id
            })?.label_name ?? ''
        )
    }

    const onClick = (label_id: number) => {
        sessionStorage.setItem('label', String(label_id))
        router.push({ name: 'Index' })
    }

    const isLikeComputed = (article_id: string) => {
        let likeArticleIdList = localStorage.getItem('likeArticleIdList')
        if (!likeArticleIdList) return false
        likeArticleIdList = JSON.parse(likeArticleIdList)
        return likeArticleIdList?.includes(article_id) ?? false
    }
    const isLike = ref(isLikeComputed(currentActicleId.value))
    const likeSvgIcon = ref(isLike.value ? 'like' : 'unlike')
    watch(isLike, v => {
        likeSvgIcon.value = v ? 'like' : 'unlike'
    })
    const onLike = () => {
        if (!isLike.value) {
            console.log('喜欢')
            isLike.value = true
            meta.value.like_number++
        } else {
            isLike.value = false
            meta.value.like_number--
        }
        likeArticle()
    }
    const likeArticle = debounce(async () => {
        // setTimeout(() => {
        //     console.log('xxxx')
        // }, 100)
        likeArticleByArticleId({
            article_id: Number(currentActicleId.value),
            is_like: isLike.value,
        }).then(res => {
            console.log(isLike.value)
            console.log(res.data.message)
            let likeArticleIdList: any = localStorage.getItem('likeArticleIdList')
                ? (localStorage.getItem('likeArticleIdList') as string)
                : JSON.stringify([])
            likeArticleIdList = JSON.parse(likeArticleIdList)
            const NO_EXIST = -1
            if (isLike.value) {
                const index = likeArticleIdList.indexOf(currentActicleId.value)
                if (index === NO_EXIST) {
                    likeArticleIdList.push(currentActicleId.value)
                }
            } else {
                const index = likeArticleIdList.indexOf(currentActicleId.value)
                console.log(index, 'index')
                if (index !== NO_EXIST) {
                    likeArticleIdList.splice(index, 1)
                    console.log('已存在现在不喜欢的移除')
                }
            }

            localStorage.setItem('likeArticleIdList', JSON.stringify(likeArticleIdList))
        })
    }, 1000)
</script>
<style lang="scss">
    .dp-detail-container {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 56px 40px 0;
        padding-top: 20px;
        min-height: 100vh;
        border-radius: 15px;
        background-color: #fff;
        &-header {
            &-meta {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-size: 12px;
                > span {
                    margin-right: 5px;
                }
                .msg {
                    .dp-author-name {
                        margin-right: 15px;
                    }
                }
                .dp-label-wrapper {
                    &-item {
                        cursor: pointer;
                        &:hover {
                            color: #1296db;
                        }
                    }
                }
            }
        }
        &-content {
            width: 100%;
        }
        .like-icon {
            font-size: 24px;
            text-align: right;
            margin-right: 40px;
            line-height: 24px;
            &-text {
                font-size: 20px;
                margin-left: 6px;
                color: #d4237a;
                user-select: none;
                display: inline-block;
                width: 40px;
                text-align: left;
            }
        }
    }
</style>
