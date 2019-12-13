import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:3001'
})

request.interceptors.request.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export function testApi() {
    return request({
        method: 'get',
        url: '/'
    })
}

export function login(data) {
    return request({
        method: 'post',
        url: '/login',
        data
    })
}

export default request
