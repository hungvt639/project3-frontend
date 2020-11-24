import React from 'react';
import '../index.css';
import 'antd/dist/antd.css';
import urls from '../../const';
import { useHistory } from 'react-router-dom'
// import { Layout } from 'antd';
const IndexProduct = ({ product }) => {
    const history = useHistory()
    const onclick = () => {
        history.push(`/home/detail/${product.id}`)
    }
    const sold = (product.sold < 1000) ? `${product.sold}` : `${(product.sold / 1000).toFixed(1)}k`
    return (
        <div onClick={onclick} className='index_product'>
            <img className="img_product" src={`${urls}${product.avatar}`} alt="Lỗi hiển thị"></img>
            <p className="name_product">{product.name}</p>
            <p className="price_product">
                {product.from_saleprice}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i> -
                {product.to_saleprice}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
            </p>
            <span className="sold_product">Đã bán {sold}</span>
        </div>
    )
}
export default IndexProduct;