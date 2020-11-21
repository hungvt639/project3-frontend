import React, {useState} from 'react';
import './index.css';
import urls from '../../const';
import {Button, Checkbox} from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import {useHistory} from 'react-router-dom'

const DetailCart = ({cart_detail, cart, setCart}) => {
    const history=useHistory()
    const API = getFactory('cart')
    const [amount, setAmount] = useState(cart_detail.amount)
    const [amountInput, setAmountInput] = useState(cart_detail.amount)
    const updateNumberProductInCart = async (data) =>{
        try{
            const res = await API.editNumberProductInCart(data, cart_detail.id)
            setAmount(res.data.amount)
            setAmountInput(res.data.amount)
        }
        catch(e){
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if(e.response.data.message){
                e.response.data.message.map(x => errorNotification(x))
            }else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }

    const minusNumber = async () =>{
        if (cart_detail.amount > 1){
            const data = {"amount": parseInt(cart_detail.amount)-1}
            updateNumberProductInCart(data)
        }else console.log(cart_detail.amount)
    }
    const plusNumber = () =>{
        if (cart_detail.amount < cart_detail.product_detail.amount){
            const data = {"amount": parseInt(cart_detail.amount)+1}
            updateNumberProductInCart(data)
        }else{
            errorNotification("Số lượng không thể lớn hơn số sản phẩm có sẵn")
        }
    }
    const changeNumber = (number) =>{
        // console.log(Number.isInteger(number))
        setAmountInput(parseInt(number))
    }
    
    const updateNumber = () => {
        if(amountInput){
            if(amountInput>0){
                const data = {"amount": parseInt(amountInput)}
                updateNumberProductInCart(data)
            }
            else{
                errorNotification("Số lượng phải lớn hơn  0")
            }
        }else{
            errorNotification("Vui lòng nhập số lượng")
        }
    }

    const showDetail = () => {
        history.push(`/home/detail/${cart_detail.product_detail.product.id}`)
    }

    const deleteItem = async () =>{
        try{
            const res = await API.deleteProductCart(cart_detail.id);
            setCart(cart.filter(c => c.id !== cart_detail.id));
            Notification(res.message);
        }
        catch (e){
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if(e.response.data.message){
                e.response.data.message.map(x => errorNotification(x))
            }else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    console.log(cart_detail)
    return(
        <div className="cart_detail_item">
            <div className="cart_product">
                <div className="cart_checkbox">
                    <Checkbox className="cart_checkbox_product" />
                </div>
                <div  className="cart_img">
                    <img onClick={showDetail} src={`${urls}${cart_detail.product_detail.product.avatar}`} alt="Lỗi hiển thị" width="120px" height="120px" />
                </div>
                
                <div className="cart_detail">
                    <div onClick={showDetail} className="name"><span>{cart_detail.product_detail.product.name}</span></div>
                    <div className="cart_detail_product">
                        <p>Màu: {cart_detail.product_detail.color}</p>
                        <div className="cart_space">|</div>
                        <p>Size: {cart_detail.product_detail.size}</p>
                    </div>
                    
                </div>
            </div>
            <div className="cart_even_product">
                <div className="cart_sum_price cart_price_color">
                    <p><i style={{'textDecorationLine':'underline'}}>đ</i> {(cart_detail.amount*cart_detail.product_detail.saleprice).toLocaleString('vi-VN')}</p>
                </div>
                <div className="cart_amount_product">
                    <Button size="small" className="button_boder cart_button" onClick={minusNumber} >
                        <MinusOutlined />
                    </Button>
                    <input type="number" min="0" step="1" defaultValue={cart_detail.amount} value={amountInput} onBlur={updateNumber} className="input_add_cart cart_input" onChange={(event)=>changeNumber(event.target.value)} />
                    <Button size="small" className="button_boder cart_button" onClick={plusNumber}>
                        <PlusOutlined />
                    </Button>
                </div>
                <div className="cart_action">
                    <a onClick={deleteItem} className="cart_delete">Xóa</a>
                    <p className="cart_price_color"><i style={{'textDecorationLine':'underline'}}>đ</i>{cart_detail.product_detail.saleprice.toLocaleString('vi-VN')}/sản phẩm</p>
                </div>
            </div>
        </div>
        
    )
    
    
}
export default DetailCart;