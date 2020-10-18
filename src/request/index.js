import UserRepository from './repository/UserRespository';
const repositories = {
    user: UserRepository,
    // schools: SchoolRespository,
}

export default function getFactory(name) {
    return repositories[name]
}
