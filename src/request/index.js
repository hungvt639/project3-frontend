import UserRepository from './repository/UserRespository';
import ProductRespository from './repository/ProductRespository' 
const repositories = {
    user: UserRepository,
    product: ProductRespository
}

export default function getFactory(name) {
    return repositories[name]
}
