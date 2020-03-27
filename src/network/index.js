import axios from 'axios'

export function local(config) {
  const ins = axios.create({
    baseURL: 'http://localhost:15001/api',
    timeout: 3000
  })
  return ins(config)
}

export function remote(config) {
  const ins = axios.create({
    baseURL: 'http://localhost:15001/api',
    timeout: 3000
  })
  return ins(config)
}
