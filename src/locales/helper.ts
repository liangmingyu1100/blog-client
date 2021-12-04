import set from 'lodash/set'

export function genMessage(
    langs: Recordable<{
        [key: string]: any
    }>,
    prefix = 'lang',
) {
    const obj: Recordable = {}
    Object.keys(langs).forEach(key => {
        const langFileModule = langs[key].default
        console.log(key)
        let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
        const lastIndex = fileName.lastIndexOf('.')
        fileName = fileName.substring(0, lastIndex)
        const keyList = fileName.split('/')
        const moduleName = keyList.shift()
        const objKey = keyList.join('.')

        if (moduleName) {
            if (objKey) {
                set(obj, moduleName, obj[moduleName] || {})
                set(obj[moduleName], objKey, langFileModule)
            } else {
                set(obj, moduleName, langFileModule || {})
            }
        }
    })
    console.log(obj)
    return obj
}
