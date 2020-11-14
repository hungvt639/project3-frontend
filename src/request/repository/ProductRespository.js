import Client from '../UserClient';
const resource = 'product';
const getProducts = () => {
    return Client(false).get(`${resource}/product/`);
};
const getDetailProduct = (id) => {
    return Client(false).get(`${resource}/product/${id}/`);
};
export default {
    getProducts,
    getDetailProduct,
};
