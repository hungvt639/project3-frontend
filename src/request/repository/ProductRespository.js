import Client from '../UserClient';
const resource = 'product';
const getProducts = (data) => {
    return Client(false).get(`${resource}/product/${data}`);
};
const getDetailProduct = (id) => {
    return Client(false).get(`${resource}/product/${id}/`);
};
const getType = (data) => {
    return Client(false).get(`${resource}/type/${data}`)
}
const deleteType = (id, data) => {
    return Client(true).delete(`${resource}/type/${id}/${data}`)
}
const createType = (data, datas) => {
    return Client(true).post(`${resource}/type/${data}`, datas)
}
const editType = (id, data) => {
    return Client(true).put(`${resource}/type/${id}/`, data)
}
export default {
    getProducts,
    getDetailProduct,

    getType,
    deleteType,
    createType,
    editType,
};
