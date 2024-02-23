export const constructURLWithQuery = (address: string, config: any): URL => {
    const url = new URL(address)

    for (const key of Object.keys(config)) {
        if (Array.isArray(config[key as keyof any])) {
            const arr = config[key as keyof any] as any[]
            arr.forEach((item) => url.searchParams.append(key, item))
        } else {
            url.searchParams.set(key, config[key as keyof any])
        }
    }

    return url
}