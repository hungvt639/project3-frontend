import getInstanceAxios from './request'
import urls from '../const'
// const baseDomain = process.env.REACT_APP_DOMAIN
const baseDomain = urls
const baseURL = `${baseDomain}/`




export default function instanceAxios(isToken) {
    return getInstanceAxios(baseURL, isToken)
}