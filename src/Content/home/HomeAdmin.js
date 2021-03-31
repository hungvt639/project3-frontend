/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import errorNotification from '../../general/errorNotification';
// import './index.css';
import 'antd/dist/antd.css';
import getFactory from '../../request/index';
import IndexProductAdmin from './IndexProductAdmin';
import { Empty, Pagination } from 'antd'
import HomeSearch from './HomeSearch';
const HomepageAdmin = () => {
    const [products, setProduct] = useState({});
    const API = getFactory('product');
    const [type, setType] = useState([])
    const [search, setSearch] = useState("")
    const [pages, setPages] = useState({ limit: 10, page: 1 })

    useEffect(() => {
        const getproduct = async () => {
            try {
                const res = await API.getProducts(`?page=${pages.page}&limit=${pages.limit}${search}`);
                setProduct(res)
            }
            catch (e) {
                errorNotification("Lỗi mạng")
            }
        }
        getproduct()
    }, [search, pages])

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

    const onShowSizeChange = (current, pageSize) => {
        setPages({ ...pages, limit: pageSize })
    }


    const onChange = (page, limit) => {
        setPages({ page: page, limit: limit })
    }
    console.log('products', products)
    return (
        <div className="home_list_product home_list_product_admin">
            <HomeSearch search={search} setSearch={setSearch} type={type} />
            <span className="items">
                <Items products={products} />
            </span>
            <div>
                <Pagination className="pagination pagination_home"
                    showSizeChanger
                    pageSize={pages.limit}
                    pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={products.page}
                    current={pages.page}
                    onChange={onChange}
                    total={products.total}
                />
            </div>
        </div>

    )


}
export default HomepageAdmin;
const Items = ({ products }) => {
    if (products.data && products.data.length) {
        return (
            <Fragment>
                {products.data.map(p => {
                    return (
                        <IndexProductAdmin key={p.id} product={p} />
                    )
                })}
            </Fragment>
        )
    }
    else {
        return (
            <Empty />
        )
    }
}