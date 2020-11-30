import Client from '../UserClient';
const createOrders = (data) => {
    return Client(true).post('order/', data);
};
export default {
    createOrders,
};
