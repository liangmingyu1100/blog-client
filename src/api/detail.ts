import { api } from './apiMap'
import vAxiosInstance, { vAxios } from '/@/utils/http/axios/request'
import get from 'lodash/get'

export async function fetchArticleDetailInfo({ article_id }: { article_id: number }) {
    try {
        const params = {
            article_id,
        }
        const response = await vAxiosInstance.get(api.FetchArticleDetailInfo, { params })
        return get(response, 'data', {})
    } catch (err) {
        vAxios.throwError(err, (code: number) => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

export async function fetchLabels() {
    try {
        const response = await vAxiosInstance.get(api.FetchLabelsInfo)
        return get(response, 'data', {})
    } catch (err) {
        vAxios.throwError(err, (code: number) => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

export async function likeArticleByArticleId(data: { article_id: number; is_like: boolean }) {
    try {
        const response = await vAxiosInstance.put(api.LikeArticle, data)
        return get(response, 'data', {})
    } catch (err) {
        vAxios.throwError(err, (code: number) => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}
