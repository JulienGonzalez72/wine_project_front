const BASE_URL = 'http://localhost:3000'

type QueryParams = { [key: string]: string | number }

type Body = { [key: string]: string | number }

export function index<T>(resource: string, queryParams?: QueryParams): Promise<T[]> {
  return request('get', resource, queryParams)
}

export function post<T>(path: string, body?: Body): Promise<T> {
  return request('post', path, undefined, body)
}

function request<T>(method: string, path: string, queryParams?: QueryParams, body?: Body): Promise<T> {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Host: 'http://localhost:3100'
      },
      body: body && JSON.stringify(body)
    }
    fetch(`${BASE_URL}/${path}${makeQueryURL(queryParams)}`, options)
      .then(res => {
        res
          .json()
          .then(json => {
            resolve(json)
          })
          .catch(reject)
      })
      .catch(reject)
  })
}

function makeQueryURL(queryParams?: QueryParams) {
  if (!queryParams) {
    return ''
  }
  const entries = Object.entries(queryParams)
  if (!entries.length) {
    return ''
  }
  let str = `?${entries[0][0]}=${encodeURIComponent(entries[0][1])}`
  for (let i = 1; i < entries.length; i++) {
    str += `&${entries[i][0]}=${encodeURIComponent(entries[i][1])}`
  }
  return str
}
