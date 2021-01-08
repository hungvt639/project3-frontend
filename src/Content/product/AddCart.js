import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Notification from '../../general/Notification';
import errorNotification from '../../general/errorNotification';
import getFactory from '../../request/index';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const AddCart = ({ product_detail, setCart, myuser }) => {
    const [number_product, setNumberProduct] = useState(1);
    const history = useHistory();
    if (myuser) {
        var res = null;
        const addNumber = () => {
            if (product_detail.id) {
                if (number_product < product_detail.amount) {
                    setNumberProduct(parseInt(number_product) + 1);
                } else {
                    setNumberProduct(product_detail.amount)
                }
            } else {
                errorNotification("Vui lòng chọn sản phẩm")
            }
        }
        const subNumber = () => {
            if (product_detail.id) {
                if (number_product > 1) {
                    setNumberProduct(parseInt(number_product) - 1)
                } else setNumberProduct(0)
            }
            else {
                errorNotification("Vui lòng chọn sản phẩm")
            }
        }
        const changeNumber = (value) => {
            if (product_detail.id) {
                if (value < 1) { setNumberProduct(0) }
                else if (value >= product_detail.amount) setNumberProduct(product_detail.amount)
                else setNumberProduct(value)
            }
            else {
                errorNotification("Vui lòng chọn sản phẩm")
            }
        }

        const addCart = async (data) => {
            const API = getFactory('cart');
            try {
                res = await API.createCart(data);
                setCart(res.data)
                Notification(res.message)
            } catch (e) {
                // debugger
                if (e.request.status && e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.request.status === 400) {
                    if (e.response.data.message) {
                        e.response.data.message.map(x => errorNotification(x))
                    }
                    else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
                } else errorNotification(e.message);
            }
        }
        const addToCart = () => {
            if (product_detail.id === 0) errorNotification("Vui lòng chọn sản phẩm trước khi thêm vào giỏ hàng");
            else {
                if (product_detail.amount <= 0) {
                    errorNotification("Sản phẩm tạm thời hết hàng")
                } else {
                    if (number_product <= 0) errorNotification('Số lượng phải lớn hơn 0');
                    else {
                        const data = { 'product_detail': product_detail.id, 'amount': parseInt(number_product) }
                        addCart(data)
                    }
                }
            }
        }
        const addToCartOrder = async () => {
            if (product_detail.id === 0) errorNotification("Vui lòng chọn sản phẩm trước khi thêm vào giỏ hàng");
            else {
                if (product_detail.amount <= 0) {
                    errorNotification("Sản phẩm tạm thời hết hàng")
                } else {
                    if (number_product <= 0) errorNotification('Số lượng phải lớn hơn 0');
                    else {
                        const data = { 'product_detail': product_detail.id, 'amount': parseInt(number_product) };
                        await addCart(data);
                        if (res) {
                            localStorage.setItem("ordercart", JSON.stringify([res.data[0]]));
                            history.push('/cart')
                        }
                    }
                }
            }
        }
        return (
            <div className="add_to_cart">
                <div className="select_amount">
                    <span className="span_amuont">Số lượng</span>
                    <Button className="button_boder" onClick={subNumber} >
                        <MinusOutlined />
                    </Button>
                    <input value={number_product} className="input_add_cart" onChange={(event) => changeNumber(event.target.value)} />
                    <Button className="button_boder" onClick={addNumber}>
                        <PlusOutlined />
                    </Button>

                    <span className="span_cart">{product_detail.amount} sản phẩm có sẵn</span>
                </div>
                <div className="div_button_add_to_cart">
                    <Button icon={<ShoppingCartOutlined />} onClick={addToCart} className="button_add_to_cart">Thêm vào giỏ hàng</Button>
                    <Button onClick={addToCartOrder} className="button_add_to_cart_order">Mua Ngay</Button>
                </div>
            </div>

        )
    } else {
        return (
            <hr />
        )
    }

};
export default AddCart;