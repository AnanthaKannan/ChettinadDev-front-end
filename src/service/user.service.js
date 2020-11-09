import http from './http';
const api = '/api/User';

export const login = (data) => {
    return http.get(`${api}/login`, data);
}


export default {
    login
}