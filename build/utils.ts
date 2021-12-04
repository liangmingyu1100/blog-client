export function wrapperEnv(env: Recordable): ViteEnv {
    const ret: any = {}

    for (const envName of Object.keys(env)) {
        let realValue = env[envName].replace(/\/n/g, '/n')
        realValue = realValue === 'true' ? true : realValue === 'false' ? false : realValue

        ret[envName] = realValue
        if (typeof realValue === 'string') {
            process.env[envName] = realValue
        } else if (typeof realValue === 'object') {
            process.env[envName] = JSON.stringify(realValue)
        }
    }

    return ret
}
