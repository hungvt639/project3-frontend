/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import errorNotification from '../../general/errorNotification';
// import './index.css';
import 'antd/dist/antd.css';
import getFactory from '../../request/index';
import IndexProductAdmin from './IndexProductAdmin';
import { Empty } from 'antd'
const HomepageAdmin = () => {
    // localStorage.removeItem('ordercart');
    const [classfortype, setClassForType] = useState(0)
    const [products, setProduct] = useState([]);
    const API = getFactory('product');
    const [type, setType] = useState([])
    const [search, setSearch] = useState("")
    const [searchValues, setSearchValues] = useState({})

    useEffect(() => {
        const getproduct = async () => {
            try {
                const res = await API.getProducts(search);
                setProduct(res.data)
            }
            catch (e) {
                errorNotification("Lỗi mạng")
            }
        }
        getproduct()
    }, [search])

    useEffect(() => {
        const getTypes = async () => {
            const API = getFactory('product');
            try {
                const res = await API.getType("")
                setType(res.data)
            } catch {
                setType([])
            }
        }
        getTypes()
    }, [])



    const setTyperSearch = async (item) => {
        const data = `?type=${item.id}`
        try {
            const res = await API.getProducts(data)
            setProduct(res.data)
            setClassForType(item.id)
        } catch (e) {
            errorNotification("Lỗi mạng")
        }
    }
    const types = (type.length) ? (type.map(t => <p className={(t.id === classfortype) ? "type_select" : ""} onClick={() => setTyperSearch(t)} key={t.id}>{t.type}</p>)) : <div></div>
    const items = []
    for (const i of products) {
        items.push(<IndexProductAdmin key={i.id} product={i} />);
    }
    if (items.length === 0) items.push(<Empty key={0} />)

    return (
        <div className="home_list_product home_list_product_admin">
            <div className="list_type">
                {types}
            </div>
            <span className="items">{items}<div className="space_button"></div></span>
        </div>

    )


}
export default HomepageAdmin;