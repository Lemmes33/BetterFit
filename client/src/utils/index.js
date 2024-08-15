export const BASE_URL = import.meta.env.DEV ? "http://localhost:5555" : "{production url\}"
export function wrappedFetch(url, options) {
    return fetch(`${BASE_URL}${url}`, options)
  }