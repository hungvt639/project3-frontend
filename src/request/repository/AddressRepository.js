import Client from '../UserClient';
const getAdd = (search) => {
    return Client(true).get(`delivery-address/${search}`);
};
const addAddress = (data) => {
    return Client(true).post('delivery-address/', data);
}
const deleteAddress = (id) => {
    return Client(true).delete(`delivery-address/${id}/`);
}
const editAddress = (id, data) => {
    return Client(true).put(`delivery-address/${id}/`, data);
}
export default {
    getAdd,
    addAddress,
    deleteAddress,
    editAddress,
};
