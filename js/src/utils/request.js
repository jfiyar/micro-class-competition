const queryParam = (data = {}) => {
    return Object.keys(data).map(k => {
        return k + '=' + data[k]
    }).join('&')
}
const ip = 'http://localhost:8080';
const get = (url, data) => {
    return fetch(ip + url + '?' + queryParam(data), {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(resp => resp.json()).then(json => {
        if (json.code === 10001) {
            this.props.history.push('/login')
        }
        return json
    })
}
const post = (url, data) => {
    return fetch(ip + url, {
        method: 'post',
        body: queryParam(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        }
    }).then(resp => resp.json()).then(json => {
        if (json.code === 10001) {
            this.props.history.push('/login')
        }
        return json
    })
}
const reqest = (type, url, data) => {
    return fetch(url, {
        method: type,
        body: queryParam(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        }
    }).then(resp => resp.json()).then(json => {
        if (json.code === 10001) {
            this.props.history.push('/login')
        }
        return json
    })
}
export default get
export { get, post, ip, reqest }