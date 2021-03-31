import React, { useState, useEffect } from 'react'
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import DetailTable from './detail-table/DetailTable'
import Detail from './detail/Detail'
import './index.css';
import { Empty } from 'antd';

const Details = ({ match }) => {

    const [product, setProduct] = useState({})
    const [view, setView] = useState(1)
    console.log(product)

    useEffect(() => {
        const getDetailProduct = async (id) => {
            const API = getFactory('product');
            try {
                const res = await API.getDetailProduct(id);
                setProduct(res.product);
            } catch (e) {
                if (e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.response.data.message) {
                    e.response.data.message.map(x => errorNotification(x))
                } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }
        }
        getDetailProduct(match.params.id)
    }, [match.params.id])

    return (
        <div className="details">
            <div className="products-admin-select">
                <div onClick={() => setView(1)} className="products-admin-select-1">
                    <p className={view === 1 ? "products-admin-selected-p" : ""}>Giao diện chi tiết</p>
                    <div className={view === 1 ? "products-admin-selected" : ""}></div>
                </div>
                <div onClick={() => setView(2)} className="products-admin-select-1">
                    <p className={view === 2 ? "products-admin-selected-p" : ""}>Giao diện mua hàng</p>
                    <div className={view === 2 ? "products-admin-selected" : ""}></div>
                </div>
            </div>
            {(Object.keys(product).length) ?
                (view === 1 ? <DetailTable match={match} product={product} setProduct={setProduct} /> : <Detail match={match} product={product} setProduct={setProduct} />) : <Empty />}
        </div>
    )
}
export default Details;