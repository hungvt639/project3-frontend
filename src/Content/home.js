/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import errorNotification from '../general/errorNotification';
import './index.css';
import 'antd/dist/antd.css';
import getFactory from '../request/index';
import IndexProduct from './product/IndexProduct';
import { Empty } from 'antd'
const Homepage = () => {
    // localStorage.removeItem('ordercart');
    const [classfortype, setClassForType] = useState(0)
    const [products, setProduct] = useState([]);
    const API = getFactory('product');
    const [type, setType] = useState([])

    useEffect(() => {
        const getproduct = async () => {
            try {
                const res = await API.getProducts("");
                setProduct(res.data)
            }
            catch (e) {
                errorNotification("Lỗi mạng")
            }
        }
        const getTypes = async () => {
            const API = getFactory('product');
            try {
                const res = await API.getType("")
                setType(res.data)
            } catch {
                setType([])
            }
        }
        getproduct()
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
    // const classType = t => (t === classfortype) ? "type_select" : "";
    // const classType = (t) => {
    //     console.log(t)
    //     return "type_select"
    // }
    // const classType = "type_select";
    const types = (type.length) ? (type.map(t => <p className={(t.id === classfortype) ? "type_select" : ""} onClick={() => setTyperSearch(t)} key={t.id}>{t.type}</p>)) : <div></div>
    const items = []
    for (const i of products) {
        items.push(<IndexProduct key={i.id} product={i} />);
    }
    if (items.length === 0) items.push(<Empty />)

    return (
        <div className="home_list_product">
            <div className="list_type">
                {types}
                {/* <div className="xxxx">
                    xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx
                </div> */}
            </div>
            <span className="items">{items}</span>
        </div>

    )


}
export default Homepage;