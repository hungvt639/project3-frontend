import Client from '../UserClient';
const getCart = () => {
    return Client(true).get('cart/');
};
const createCart = (data) =>{
    return Client(true).post('cart/', data);
}

export default {
    getCart,
    createCart,
};
