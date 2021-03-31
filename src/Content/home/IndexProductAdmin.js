import React from 'react';
import '../index.css';
import 'antd/dist/antd.css';
import urls from '../../const';
import { useHistory } from 'react-router-dom'
import { Fragment } from 'react';
import calculate from '../../general/calculate'
// import { Layout } from 'antd';
const IndexProductAdmin = ({ product }) => {
    const history = useHistory()
    const onclick = () => {
        history.push(`/detail/${product.id}`)
    }
    // console.log("p", product)

    console.log(calculate(50000, product.promotion))
    const sale = (product.from_saleprice === product.to_saleprice) ? <p className="price_product">
        {calculate(product.from_saleprice, product.promotion).toLocaleString('vi-VN')}₫
    </p> :
        <p className="price_product">
            {product.from_saleprice.toLocaleString('vi-VN')}₫ -
                {product.to_saleprice.toLocaleString('vi-VN')}₫
        </p>
    const price = (product.from_saleprice === product.to_saleprice) ? <p className="price_product">
        {product.from_saleprice.toLocaleString('vi-VN')}₫
        </p> :
        <p className="price_product">
            {product.from_saleprice.toLocaleString('vi-VN')}₫ -
                    {product.to_saleprice.toLocaleString('vi-VN')}₫
            </p>
    const sold = (product.sold < 1000) ? `${product.sold}` : `${(product.sold / 1000).toFixed(1)}k`
    return (
        <div onClick={onclick} className='index_product index_product_admin'>
            {product.promotion ? <div className="detail_product_promotion">{`- ${product.promotion.promotion.value} ${product.promotion.promotion.type ? "VND" : "%"}`}</div> : <Fragment />}
            <img className="img_product" src={`${urls}${product.avatar}`} alt="Lỗi hiển thị"></img>
            <p className="name_product">{product.name}</p>
            {product.promotion ? <div className="price_product_no_promotion">{price}</div> : <Fragment />}
            {sale}
            <span className="sold_product">Đã bán {sold}</span>
        </div>
    )
}
export default IndexProductAdmin;