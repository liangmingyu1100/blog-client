import VAxios from '/@/utils/http/axios/http'
const VUE_APP_BASE_URL = import.meta.env.VITE_APP_API_HOST as string
export const vAxios = new VAxios(
    {
        baseURL: VUE_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    },
    {
        request: true,
        // getTokenCallback: () => window.localStorage.get('token'),
    },
)
const vAxiosInstance = vAxios.getInstance()
export default vAxiosInstance
