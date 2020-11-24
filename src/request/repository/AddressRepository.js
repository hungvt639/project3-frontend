import Client from '../UserClient';
const getAdd = () => {
    return Client(true).get('delivery-address/');
};

export default {
    getAdd
};
