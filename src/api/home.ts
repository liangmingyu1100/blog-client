import { api } from './apiMap'
import vAxiosInstance, { vAxios } from '/@/utils/http/axios/request'
import get from 'lodash/get'

export async function fetchHomePage({ page, limit, label_id }: { page: number; limit: number; label_id: number }) {
    try {
        const params = {
            page,
            limit,
            label_id,
        }
        const response = await vAxiosInstance.get(api.FetchHomePage, { params })
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
