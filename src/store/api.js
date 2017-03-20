import request from 'axios'
import Cookie from '../store/cookie'
import router from '../route/index'
import { Message } from 'element-ui';

let root = '/proxyPrefix'

let store = {}

export default store

// request.defaults.validateStatus = (status) => {
// 	return status < 500;
// }

//配置请求拦截器
request.interceptors.request.use(
    config => {
        if (Cookie.get("token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
			var token = Cookie.get("token");
            config.headers.Authorization = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//配置返回拦截器
request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Message.error("用户认证已过期，请重新登录");
                    // 返回 401 清除token信息并跳转到登录页面
					Cookie.delete("token");
                    router.replace({
                        path: 'login'
                    });
                    break;
                default:
                    Message.error("服务器爆炸了");
                    break;
					
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


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
