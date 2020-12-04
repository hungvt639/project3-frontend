import React from 'react';
import urls from '../../const';
const Product = ({ product }) => {
    return (
        <div className="cart_detail_item checkout_product_list">
            <div className="cart_product">
                <div className="cart_img">
                    <img src={`${urls}${product.product_detail.product.avatar}`} alt="Lỗi hiển thị" height="120px" />
                </div>

                <div className="cart_detail">
                    <div className="name"><span>{product.product_detail.product.name}</span></div>
                    <div className="cart_detail_product">
                        <p>Màu: {product.product_detail.color}</p>
                        <div className="cart_space">|</div>
                        <p>Size: {product.product_detail.size}</p>
                    </div>

                </div>
            </div>
            <div className="cart_even_product">
                <div className="cart_sum_price cart_price_color">
                    <p><i style={{ 'textDecorationLine': 'underline' }}>đ</i> {product.product_detail.saleprice.toLocaleString('vi-VN')}/sản phẩm</p>
                </div>
                <div className="cart_amount_product">
                    <p>{product.amount}</p>
                </div>
                <div className="cart_action">
                    <p className="cart_price_color"><i style={{ 'textDecorationLine': 'underline' }}>đ</i>{(product.amount * product.product_detail.saleprice).toLocaleString('vi-VN')}</p>
                </div>
            </div>
        </div>
    )
}
export default Product;