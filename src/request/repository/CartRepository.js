import Client from '../UserClient';
const getCart = () => {
    return Client(true).get('cart/');
};
const createCart = (data) =>{
    return Client(true).post('cart/', data);
}
const deleteProductCart = (id) =>{
    return Client(true).delete(`cart/${id}/`);
}
const editNumberProductInCart = (data, id) =>{
    return Client(true).put(`cart/${id}/`, data);
}
export default {
    getCart,
    createCart,
    deleteProductCart,
    editNumberProductInCart,
};
