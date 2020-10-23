import React from 'react';
import './index_product.css';
import 'antd/dist/antd.css';
import urls from '../const';
import { useHistory } from 'react-router-dom'
// import { Layout } from 'antd';
 const IndexProduct = ({product}) => {
     const history = useHistory()
     const onclick = () => {
        history.push(`/home/detail/${product.id}`)
     }
     return(
         <div onClick={onclick} className='index_product'>
            <img className="img_product" src={`${urls}${product.img}`} alt="Lỗi hiển thị"></img>
            <p className="name_product">{product.name}</p>
            <span className="price_product">{product.price}<i style={{'textDecorationLine':'underline', 'verticalAlign':'5px'}}>đ</i></span>
            <span className="sold_product">Đã bán {product.sold}</span>
         </div>
     )
 }
 export default IndexProduct;