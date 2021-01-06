import React from 'react';
import '../index.css';
import 'antd/dist/antd.css';
import urls from '../../const';
import { useHistory } from 'react-router-dom'
// import { Layout } from 'antd';
const IndexProductAdmin = ({ product }) => {
    const history = useHistory()
    const onclick = () => {
        history.push(`/home/detail/${product.id}`)
    }
    const sale = (product.from_saleprice === product.to_saleprice) ? <p className="price_product">
        {product.from_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
    </p> :
        <p className="price_product">
            {product.from_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i> -
                {product.to_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
        </p>
    const sold = (product.sold < 1000) ? `${product.sold}` : `${(product.sold / 1000).toFixed(1)}k`
    return (
        <div onClick={onclick} className='index_product index_product_admin'>
            <img className="img_product" src={`${urls}${product.avatar}`} alt="Lỗi hiển thị"></img>
            <p className="name_product">{product.name}</p>
            {sale}
            <span className="sold_product">Đã bán {sold}</span>
        </div>
    )
}
export default IndexProductAdmin;