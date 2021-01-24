import Client from '../UserClient';

const getPromotions = (data) => {
    return Client(false).get(`promotion/${data}`);
};

const getProduct = (id) => {
    return Client(false).get(`promotion/${id}/`);
};

const createPromotions = (data) => {
    return Client(true).post("promotion/", data);
};

const editPromotions = (id, data) => {
    return Client(true).put(`promotion/${id}/`, data);
};
const deletePromotions = (id, data) => {
    return Client(true).post(`promotion/${id}/`, data);
};


const addProducts = (data) => {
    return Client(true).post(`promotionproducts/`, data);
};


export default {
    getPromotions,
    createPromotions,
    editPromotions,
    deletePromotions,
    getProduct,
    addProducts
};
