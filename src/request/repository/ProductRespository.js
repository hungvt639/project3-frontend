import Client from '../UserClient';
const resource = 'product';
const getProducts = () => {
    return Client(false).get(`${resource}/product/`);
};
const getDetailProduct = (id) => {
    return Client(false).get(`${resource}/product/${id}/`);
};
const getType = () => {
    return Client(false).get(`${resource}/type/`)
}
export default {
    getProducts,
    getDetailProduct,
    getType,
};
