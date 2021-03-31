import { Empty } from 'antd';
import React, { useState } from 'react'
import { Fragment } from 'react';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'
import FormAddProducts from './FormAddProduct'
import getFactory from '../../request/index';
import Catch from '../../general/Catch';
import Notification from '../../general/Notification';
const PromotionDetail = ({ promotions, promotionShow, setPromotions }) => {
    const [show, setShow] = useState(false)
    console.log('promotionShow', promotionShow)
    async function deleteProductPromotion(id, i) {
        const API = getFactory("promotion")

        // console.log(id, i)
        try {
            await API.deleteProductPromotion(id)
            setPromotions({
                ...promotions,
                data: promotions.data.slice(0, promotionShow.id)
                    .concat({
                        ...promotions.data[promotionShow.id],
                        promotions: promotions.data[promotionShow.id].promotions.slice(0, i)
                            .concat(promotions.data[promotionShow.id].promotions.slice(i + 1))
                    })
                    .concat(promotions.data.slice(promotionShow.id + 1))
            })
            Notification("Xóa sản phẩn khỏi danh sách khuyến mãi thành công!")
        } catch (e) { Catch(e) }
    }
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
                            <Product products={promotions.data[promotionShow.id].promotions} deleteProductPromotion={deleteProductPromotion} />

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

const Product = ({ products, deleteProductPromotion }) => {
    if (products.length) {
        return (
            <ul>
                {products.map((p, i) => {
                    return (
                        <div key={i} className="promotion_right_product_name">
                            <li>{p.product.name}</li>
                            <button onClick={() => deleteProductPromotion(p.id, i)} ><CloseOutlined /></button>
                        </div>
                    )
                })}
            </ul>
        )
    } else {
        return (<Empty />)
    }

}