import Client from '../UserClient';

const getPromotions = (data) => {
    return Client(false).get(`promotion/${data}`);
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
export default {
    getPromotions,
    createPromotions,
    editPromotions,
    deletePromotions,
};
