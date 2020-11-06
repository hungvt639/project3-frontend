import Client from '../UserClient';
const resource = 'user';
const signUp = (data) => {
    return Client(false).post(`${resource}/register/`, data);
};

const signIn = (data) => {
    return Client(false).post(`${resource}/login/`, data);
};

const changePassword = (data) => {
    return Client(true).post(`${resource}/change-password/`, data);
};

const getProfile = () => {
    return Client(true).get(`${resource}/profile/`);
}
const Logout = () => {
    return Client(true).get(`${resource}/logout/`);
}
const EditProfile = (data) => {
    return Client(true).put(`${resource}/profile/`, data);
}
export default {
    signIn,
    signUp,
    changePassword,
    getProfile,
    Logout,
    EditProfile,
};
