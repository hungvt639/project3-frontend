import UserRepository from './repository/UserRespository';
import ProductRespository from './repository/ProductRespository';
import CartRepository from './repository/CartRepository';
import AddressRepository from './repository/AddressRepository'
const repositories = {
    user: UserRepository,
    product: ProductRespository,
    cart: CartRepository,
    address: AddressRepository,
}

export default function getFactory(name) {
    return repositories[name]
}
