/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import errorNotification from '../../general/errorNotification';
import 'antd/dist/antd.css';
import getFactory from '../../request/index';
import IndexProduct from './IndexProduct';
import HomeSearch from './HomeSearch';
import { Empty, Pagination, Carousel } from 'antd';
import './home.css'
import { Fragment } from 'react';
const Homepage = () => {

    const [products, setProduct] = useState({});
    const API = getFactory('product');
    const [type, setType] = useState([])
    const [search, setSearch] = useState("")
    const [pages, setPages] = useState({ limit: 10, page: 1 })
    const [promotions, setPromotion] = useState([])

    useEffect(() => {
        async function getPromotion() {
            const APIs = getFactory('promotion')
            try {
                const res = await APIs.getPromotions(`?&limit=10&value=1`)
                setPromotion(res.data)
            } catch (e) { }
        }
        getPromotion()
    }, [])

    console.log("promo", promotions)
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

    return (
        <div className="home_list_product">
            <Promotion promotions={promotions} />
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
export default Homepage;

const Items = ({ products }) => {
    if (products.data && products.data.length) {
        return (
            <Fragment>
                {products.data.map(p => {
                    return (
                        <IndexProduct key={p.id} product={p} />
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
const Promotion = ({ promotions }) => {
    const classshow = ["carousel1", "carousel2", "carousel3"]
    if (promotions && promotions.length) {
        return (
            <Carousel autoplay >
                {promotions.map((p, i) => {
                    return (
                        <div className={`promotion_show_index ${classshow[i % 3]}`}>
                            <p>{p.name}</p>
                            <div className="promotion_show_index_div" >Giảm giá: {p.value.toLocaleString('vi-VN')}{p.type ?
                                "₫" : "%"} /sản phẩm{(!p.type && p.max_value) ?
                                    `, tối đa ${p.max_value.toLocaleString('vi-VN')}₫ ` : ""}
                            </div>
                        </div>
                    )
                })}
            </Carousel >
        )
    } else {
        return (<Fragment />)
    }
}