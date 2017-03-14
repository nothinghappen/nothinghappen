import request from 'axios'

let root = '/proxyPrefix'

let store = {}

export default store

store.get = (url, query) => {
	return request.get(`${root}${url}`, {
		params: query
	});
}

store.post = (url, query) => {
	return request.post(`${root}${url}`,query);
}

store.put = (url, query) => {
	return request.put(`${root}${url}`,query);
}

store.delete = (url, query) => {
	return request.delete(`${root}${url}`, {
		params: query
	});
}
