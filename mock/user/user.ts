import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/api/getUser',
        method: 'post',
        response: () => {
            console.log('resssss')
            return {
                code: 0,
                message: 'ok',
                data: ['a', 'b'],
            }
        },
    },
] as MockMethod[]
