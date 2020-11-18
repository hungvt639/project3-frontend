import React, {useState} from 'react';
import {Button } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import Notification from '../../general/Notification';
import errorNotification from '../../general/errorNotification';
import getFactory from '../../request/index'
import {ShoppingCartOutlined} from '@ant-design/icons'

const AddCart = ({product_detail, cart, setCart}) => {
    console.log(product_detail);
    console.log(cart);
    const [number_product, setNumberProduct] = useState(1);
    const addNumber = () => {
        if (number_product < product_detail.amount){
            setNumberProduct(number_product+1);
        }else{
            setNumberProduct(product_detail.amount)
        }
        
    }
    const subNumber = () => {
        if (number_product > 1){
            setNumberProduct(number_product-1)
        }else setNumberProduct(0)
    }
    const changeNumber = (value) => {
        if (value < 1 ){setNumberProduct(0)}
        else if (value >= product_detail.amount) setNumberProduct(product_detail.amount)
        else setNumberProduct(value)
    }

    const addCart = async (data) =>{
        const API = getFactory('cart');
        try{
            const res = await API.createCart(data);
            const index = cart.findIndex(x => x.id === res.data.id);
            if (index < 0){
                setCart(cart.concat(res.data))
            }else{
                const c = cart;
                c[index].amount = c[index].amount + res.data.amount;
                setCart(c);
            }
            Notification(res.message)
        }catch (e){
            // debugger
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if (e.request.status === 400){
                if(e.response.data.message){
                    e.response.data.message.map(x => errorNotification(x))
                }
                else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }else errorNotification(e.message);
        }
    }
console.log(number_product)
    const addToCart = () => {
        if(product_detail.amount <= 0){
            errorNotification("Sản phẩm tạm thời hết hàng")
        }else{
            if(number_product<=0) errorNotification('Số lượng phải lớn hơn 0');
            else{
                const data = {'product_detail': product_detail.id, 'amount': number_product}
                addCart(data)
            }
        }
    }
    return(
        <div className="add_to_cart">
            <div className="select_amount">
                <span className="span_amuont">Số lượng</span>
                    <Button className="button_boder" onClick={subNumber} >
                        <MinusOutlined />
                    </Button>
                    <input value={number_product} className="input_add_cart" onChange={(event)=>changeNumber(event.target.value)} />
                    <Button className="button_boder" onClick={addNumber}>
                        <PlusOutlined />
                    </Button>

                <span className="span_cart">{product_detail.amount} sản phẩm có sẵn</span>
            </div>
            <div className="div_button_add_to_cart">
                <Button icon={<ShoppingCartOutlined/>} onClick={addToCart} className="button_add_to_cart">Thêm vào giỏ hàng</Button>
            </div>
        </div>
        
    )
};
export default AddCart;