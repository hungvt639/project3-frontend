import UserRepository from './repository/UserRespository';
import ProductRespository from './repository/ProductRespository';
import CartRepository from './repository/CartRepository'
const repositories = {
    user: UserRepository,
    product: ProductRespository,
    cart: CartRepository
}

export default function getFactory(name) {
    return repositories[name]
}
