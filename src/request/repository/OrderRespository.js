import Client from '../UserClient';
const createOrders = (data) => {
    return Client(true).post('order/', data);
};

const getOrders = (data) => {
    return Client(true).get(`order/${data}`);
};

const cancelOrder = (id, data) => {
    return Client(true).put(`order/${id}/`, data)
}
export default {
    createOrders,
    getOrders,
    cancelOrder,
};
