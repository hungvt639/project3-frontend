import React from 'react';
import calculateCart from '../../general/calculate-cart';

import Product from './Product';
const DetailPurchase = ({ order }) => {
    const sum_product = (order.product.map((c) => c.amount).reduce((per, next) => per + next));
    const sum_price = (order.product.map((c) => c.amount * calculateCart(c.product_detail.saleprice, c.promotion)).reduce((per, next) => per + next));
    const products = order.product.map(pur => <Product key={pur.id} product={pur} />)
    return (
        <div className="purchase_products order_space">
            <div className="cart_detail_item checkout_product_detail_item">
                <div className="cart_product">
                    <p className="checkout_product_name">Sản phẩm</p>
                </div>
                <div className="cart_even_product">
                    <div className="cart_amount_product">
                        <p>Kho</p>
                    </div>
                    <div className="cart_sum_price cart_price_color">
                        <p>Đơn giá</p>
                    </div>
                    <div className="cart_amount_product">
                        <p>Số lượng</p>
                    </div>
                    <div className="cart_action">
                        <p className="cart_price_color">Thành tiền</p>
                    </div>
                </div>
            </div>
            {products}
            <div className="cart_detail_item checkout_product_detail_item">
                <div className="cart_product">
                    <p className="checkout_product_name">Tổng</p>
                </div>
                <div className="cart_even_product">
                    <div className="cart_sum_price cart_price_color"></div>
                    <div className="cart_amount_product">
                        <p>{sum_product}</p>
                    </div>
                    <div className="cart_action">
                        <p className="cart_price_color"><i style={{ 'textDecorationLine': 'underline' }}>đ</i>{sum_price.toLocaleString('vi-VN')}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default DetailPurchase;
