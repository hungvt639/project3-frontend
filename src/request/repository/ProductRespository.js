import Client from '../UserClient';
const resource = 'product';
const getProducts = (data) => {
    return Client(false).get(`${resource}/product/${data}`);
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
