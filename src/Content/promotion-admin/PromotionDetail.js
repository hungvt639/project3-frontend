import { Empty } from 'antd';
import React, { useState } from 'react'
import { Fragment } from 'react';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'
import FormAddProducts from './FormAddProduct'
const PromotionDetail = ({ promotions, promotionShow, setPromotions }) => {
    const [show, setShow] = useState(false)
    console.log('promotionShow', promotionShow)
    return (
        <Fragment>
            <div className="display_inline promotion_right">
                <div className="promotion_right1">
                    <h1>Sản phẩm áp dụng</h1>
                    {promotionShow.id !== -1 ? <div
                        onClick={() => setShow(true)}
                        className="prototions_product_tn_add">
                        <button><PlusCircleOutlined /> Thêm</button></div> : <Fragment />}
                    {promotions.data && promotionShow.id !== -1 ?
                        <Fragment>
                            <Product products={promotionShow.promotion.promotions} />

                        </Fragment> : <Empty />
                    }
                </div>
            </div>
            {show ? promotionShow.id !== -1 ?
                <FormAddProducts
                    show={show}
                    setShow={setShow}
                    promotion={promotionShow.promotion}
                    promotions={promotions}
                    index={promotionShow.id}
                    setPromotions={setPromotions} />
                : <Fragment /> : <Fragment />}

        </Fragment>

    )
}
export default PromotionDetail;

const Product = ({ products }) => {
    if (products.length) {
        return (
            <ul>
                {products.map((p, i) => {
                    return (
                        <div key={i} className="promotion_right_product_name">
                            <li>{p.product.name}</li>
                            <button><CloseOutlined /></button>
                        </div>
                    )
                })}
            </ul>
        )
    } else {
        return (<Empty />)
    }

}