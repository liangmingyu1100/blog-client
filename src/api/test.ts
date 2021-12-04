/**
 * test测试代码：
 */
import VAxios from '../utils/http/axios/http'
import get from 'lodash/get'

const vAxios = new VAxios(
    {
        baseURL: '/',
        headers: {
            'Content-Type': 'application/json',
        },
    },
    {
        request: true,
        getTokenCallback: () => window.localStorage.get('token'),
    },
)
const instance = vAxios.getInstance()

/**
 * 获取外链页面链接
 * @returns {Promise<*>}
 */
export async function fetchOutsideUrl() {
    try {
        const response = await instance.get('/v1/url/info', { params: { name: '1xxzzcasd' } })
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

export async function getInviteActivityInfo() {
    try {
        const params = {}
        const url = '/v1/h5/activity/invited/info'
        const response = await instance.get(url, params)
        const res = get(response, 'data', {})
        return res
    } catch (err) {
        vAxios.throwError(err, (code: any) => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                    return ''
                }
            }
        })
    }
}

/**
 * 获取外链页面链接
 * @returns {Promise<*>}
 */
export async function getUserInfo() {
    try {
        const response = await instance.post('/api/getUser')
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
