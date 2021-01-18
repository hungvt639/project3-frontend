import { Empty } from 'antd';
import React from 'react'
import { Fragment } from 'react';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'

const PromotionDetail = ({ promotions, promotionShow, setPromotions }) => {
    console.log("detail", promotionShow)
    return (
        <div className="display_inline promotion_right">
            <div className="promotion_right1">
                <h1>Sản phẩm áp dụng</h1>
                <div className="prototions_product_tn_add"><button><PlusCircleOutlined /> Thêm</button></div>
                {promotions.data && promotionShow !== -1 ?
                    <Fragment>
                        {/* <h2>Nhóm sản phẩm:</h2>
                        <Type types={promotions.data[promotionShow].promotiontype} /> */}
                        {/* <h2>Sản phẩm:</h2> */}
                        <Product products={promotions.data[promotionShow].promotions} />
                    </Fragment> : <Empty />
                }
            </div>


        </div>
    )
}
export default PromotionDetail;
// const Type = ({ types }) => {
//     return (
//         <Fragment>
//             {types.map((p, i) => {
//                 return (
//                     <div key={i} className="promotion_right_type">
//                         <div className="promotion_right_type_name" >
//                             <span>{p.type.type}</span>
//                             {p.type.products.map(e => {
//                                 return (<p key={e.id}>{e.name}</p>)
//                             })}
//                         </div>
//                         <button><CloseOutlined /></button>
//                     </div>
//                 )
//             })}
//         </Fragment>
//     )
// }
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