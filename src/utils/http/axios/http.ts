import type { SetupInterceptorOptions, CreateAxiosOptions, AxiosErrorResponse } from '../../../types/axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { commonErrorCode } from './enum'
import axios from 'axios'
import get from 'lodash/get'
import set from 'lodash/set'
import assign from 'lodash/assign'
import isError from 'lodash/isError'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'

export default class VAxios {
    private axiosInstance: AxiosInstance
    private config: AxiosRequestConfig
    codePos: string | number
    messagePos: string

    constructor(config: AxiosRequestConfig, options: CreateAxiosOptions) {
        this.config = config
        this.axiosInstance = axios.create(config)
        this.setupInterceptor(this.axiosInstance, options)
        const { codePos, messagePos } = options
        this.codePos = codePos || 'data.code'
        this.messagePos = messagePos || 'data.message'
    }

    private createAxios(config: AxiosRequestConfig): void {
        this.axiosInstance = axios.create(config)
    }

    getInstance(): AxiosInstance {
        return this.axiosInstance
    }

    setHeader(headers: any): void {
        if (!this.axiosInstance) {
            return
        }
        Object.assign(this.axiosInstance.defaults.headers, headers)
    }

    setupInterceptor(instance: AxiosInstance, options: SetupInterceptorOptions = {}) {
        const instanceProxy = instance || this.getInstance()
        const { request = true, getTokenCallback } = options
        if (request && getTokenCallback) {
            instanceProxy.interceptors.request.use(
                async config => {
                    const tk = getTokenCallback()
                    config.headers = assign(config.headers, {
                        Authorization: tk,
                    })
                    return config
                },
                err => Promise.reject(err),
            )
        }

        instanceProxy.interceptors.response.use(
            response => {
                if (response.data && isString(response.data)) {
                    response.data = JSON.parse(response.data)
                }
                // 没有 meta 信息将直接返回响应
                if (!response.data[this.codePos]) {
                    return response
                }
                const metaCode = get(response, this.codePos)
                // 响应结果非 `0` 将当成是错误处理
                switch (metaCode) {
                    case 0:
                    case 200: {
                        return response
                    }

                    default: {
                        throw this.toError(response)
                    }
                }
            },
            data => this.onError(data),
        )
    }

    onError(err: AxiosErrorResponse) {
        if (this.isOnline()) {
            return Promise.reject(this.toError(err.response) || (err.message ? new Error(err.message) : err.response))
        } else {
            return Promise.reject(new Error('网络连接错误'))
        }
    }

    toError(error: AxiosErrorResponse) {
        if (isUndefined(get(error, this.messagePos))) {
            const code = get(error, this.codePos, get(error, 'status', -1))

            const errMsg: string = this.isOnline() ? '未知错误' : '网络连接错误'
            const msg = code !== -1 ? '请求错误' + code : get(error, 'message', errMsg)

            set(error, this.messagePos, msg)
        }

        const err = error
        if (!isError(err)) {
            const errMsg: string = window.navigator && window.navigator.onLine ? '未知错误' : '网络连接错误'
            const defaultMsg = get(error, this.messagePos, get(error, 'message', errMsg))
            if (err) {
                err.message = get(error, 'message', defaultMsg)
            } else {
                return new Error(defaultMsg)
            }
        }

        return err
    }

    throwError(err: any, handle: Function, codePos = 'data.code') {
        const code = get(err, codePos, get(err, 'status'))
        const { message } = err
        const msg = handle(code, err) || message
        if (msg && err.message !== msg) {
            err.message = msg
        }
        /* 通用状态码 */
        if (Object.keys(commonErrorCode).includes(code)) {
            err.message = commonErrorCode[code]
        }
        throw err
    }

    isOnline() {
        return window.navigator ? window.navigator.onLine : true
    }
}
