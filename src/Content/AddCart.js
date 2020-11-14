import React, {useState} from 'react';
import {Button, InputNumber } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
const AddCart = ({product_detail}) => {
    const [number_product, setNumberProduct] = useState(1);
    const addNumber = () => {
        if (number_product < product_detail.amount)
        setNumberProduct(number_product+1);
    }
    const subNumber = () => {
        if (number_product > 1){
            setNumberProduct(number_product-1)
        }
    }
    const changeNumber = (value) => {
        if (value <=1 ){setNumberProduct(1)}
        else if (value >= product_detail.amount) setNumberProduct(product_detail.amount)
        else setNumberProduct(value)
    }
    const addToCart = () => {

    }
    return(
        <div>
            <Button onClick={subNumber} >
                <MinusOutlined />
            </Button>
            <InputNumber value={number_product} className="input_add_cart" onChange={changeNumber} />
            <Button onClick={addNumber}>
                <PlusOutlined />
            </Button>
            <span>Số lượng trong kho: {product_detail.amount}</span>
            <div>
                <Button onClick={addToCart} className="detail_product_detail_activate">Thêm vào giỏ hàng</Button>
            </div>
        </div>
        
    )
};
export default AddCart;