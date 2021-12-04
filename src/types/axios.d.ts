import { AxiosResponse } from 'axios'

export interface SetupInterceptorOptions {
    request?: boolean
    getTokenCallback?: Function
}
export interface CreateAxiosOptions extends SetupInterceptorOptions {
    codePos?: string | number
    messagePos?: string
}
export interface AxiosErrorResponse<T = any> extends AxiosResponse {
    message?: string
    response?: T
}
