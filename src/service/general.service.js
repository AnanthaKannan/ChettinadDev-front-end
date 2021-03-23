import http from './http';
const api = '/api/general';

export const getCategory = () => {
    return http.get(`${api}/getCategory`);
}

export const addCategory = (data) => {
    return http.post(`${api}/addCategory`, data);
}

export const addProduct = (data) => {
    return http.post(`${api}/addProduct`, data);
}

export const deleteCategoryId = (data) => {
    return http.delete(`${api}/deleteCategoryId`, data);
}

export const getVendor = () => {
    return http.get(`${api}/getVendor`);
}

export const addVendor = (data) => {
    return http.post(`${api}/addVendor`, data);
}

export const deleteVendorById = (data) => {
    return http.delete(`${api}/deleteVendorById`, data);
}

export const getProduct = () => {
    return http.get(`${api}/getProduct`);
}

export const getStockDetailsByProductId = (data) => {
    return http.get(`${api}/getStockDetailsByProductId`, data);
}

export const addStock = (data) => {
    return http.post(`${api}/addStock`, data);
}

export default {
    getCategory,
    addCategory,
    deleteCategoryId,
    addVendor,
    deleteVendorById,
    getVendor,
    getProduct,
    getStockDetailsByProductId,
    addStock,
    addProduct
}