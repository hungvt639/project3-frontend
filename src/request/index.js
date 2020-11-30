import UserRepository from './repository/UserRespository';
import ProductRespository from './repository/ProductRespository';
import CartRepository from './repository/CartRepository';
import AddressRepository from './repository/AddressRepository'
import OrderRespository from './repository/OrderRespository'
const repositories = {
    user: UserRepository,
    product: ProductRespository,
    cart: CartRepository,
    address: AddressRepository,
    order: OrderRespository,
}

export default function getFactory(name) {
    return repositories[name]
}
