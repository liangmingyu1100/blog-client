export const commonErrorCode: commonErrorCodeMap = {
    403: '权限验证失败',
    404: 'NOT FOUND',
    413: '请求实体过长',
    415: '算法内部异常',
    424: '图片下载失败',
    500: '服务器异常，请稍后再试',
    502: '服务器异常，请稍后再试',
    503: '服务暂时不可用，请稍后重试',
    599: '算法连接超时',
}
interface commonErrorCodeMap {
    [index: number]: string
}
