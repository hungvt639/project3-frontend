import Client from '../UserClient';
const resource = 'product';
const getProducts = (data) => {
    return Client(false).get(`${resource}/product/${data}`);
};
const getDetailProduct = (id) => {
    return Client(false).get(`${resource}/product/${id}/`);
};
const deleteProducts = (id) => {
    return Client(true).delete(`${resource}/product/${id}/`);
};
const createProduct = (data) => {
    return Client(true).post(`${resource}/product/`, data);
};


const createListDescribes = (data) => {
    return Client(true).post(`${resource}/describe/`, data);
}
const deleteDescribes = (id) => {
    return Client(true).delete(`${resource}/describe/${id}/`);
}


const getDetail = (search) => {
    return Client(false).get(`${resource}/detail/${search}`);
};
const editDetail = (id, data) => {
    return Client(true).put(`${resource}/detail/${id}/`, data);
};
const deleteDetail = (id) => {
    return Client(true).delete(`${resource}/detail/${id}/`);
};
const createDetail = (data) => {
    return Client(true).post(`${resource}/detail/`, data);
};


const getType = (data) => {
    return Client(false).get(`${resource}/type/${data}`)
}
const deleteType = (id, data) => {
    return Client(true).delete(`${resource}/type/${id}/${data}`)
}
const createType = (data, datas) => {
    return Client(true).post(`${resource}/type/${data}`, datas)
}
const editType = (id, data) => {
    return Client(true).put(`${resource}/type/${id}/`, data)
}


const createAmount = (data) => {
    return Client(true).post(`${resource}/amount/`, data)
}
const getAmount = (search) => {
    return Client(true).get(`${resource}/amount/${search}`)
}

const deleteImage = (id) => {
    return Client(true).delete(`${resource}/image/${id}/`)
}


const deleteDescription = (id) => {
    return Client(true).delete(`${resource}/description/${id}/`);
};
export default {
    getProducts,
    getDetailProduct,
    deleteProducts,
    createProduct,

    createListDescribes,
    deleteDescribes,

    getDetail,
    editDetail,
    deleteDetail,
    createDetail,

    getType,
    deleteType,
    createType,
    editType,

    createAmount,
    getAmount,

    deleteImage,

    deleteDescription,
};
