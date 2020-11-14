import React, {useState, useEffect} from 'react';
import { Image, Empty } from 'antd';
import urls from '../const';
import './product.css';
import {Button} from 'antd';
import AddCart from './AddCart';
import getFactory from '../request/index';
import errorNotification from '../general/errorNotification';
import {Redirect} from 'react-router-dom'
const Detail = () => {
    const [product, setProduct] = useState({})
    const [product_detail, setDetail] = useState({id: 0});

    const getDetailProduct = async (id) =>{
        const API = getFactory('product');
        try{
            const res = await API.getDetailProduct(id);
            console.log(res);
            setProduct(res);
        }catch (e) {
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if (e.request.status === 400){
                errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }else if(e.request.status === 404){
                return <Redirect to="/sos" />
            }else errorNotification(e.message);
        }
    }
    useEffect(()=>{
        const id = window.location.href.split('/').pop();
        getDetailProduct(id)
    },[])


    if(Object.keys(product).length){
        const prices = (product_detail.id !== 0)?
            <p id="price" className="price_detail"> 
                Giá: {product_detail.price}<i style={{'textDecorationLine':'underline', 'verticalAlign':'5px'}}>đ</i>
            </p>:
            <p id="price" className="price_detail"> 
                Giá: {product.from_saleprice}<i style={{'textDecorationLine':'underline', 'verticalAlign':'5px'}}>đ</i> - 
                {product.to_saleprice}<i style={{'textDecorationLine':'underline', 'verticalAlign':'5px'}}>đ</i>
            </p>;
    
    
        const imgs=[]
        for(const i of product.image){
            imgs.push(<Image width="100px" key={i.id} className="img_detail" src={`${urls}${i.img}`} />);
        }
    
    
        const describes=[]
        for(const describe of product.describe){
            describes.push(<li key={describe.id}>{describe.header} : {describe.context}</li>)
        }
    
    
        const details = []
        for (const detail of product.details){
            details.push(
                <Button className={(product_detail.id === detail.id)? "detail_product_detail_activate":""} key={detail.id} onClick={() => setDetail(detail)}>{detail.size} - {detail.color}</Button>
            )
        }
    
        const select = (product_detail.id !== 0)? <AddCart product_detail={product_detail} />: <br></br>;
        const sold = (product.sold<1000)?`${product.sold}`:`${(product.sold/1000).toFixed(1)}k`

        return(
            <div className="detail">
                <div className="detail_left">
                    <Image className="avatar_detail"
                        width="100%"
                        src={`${urls}${product.avatar}`}
                    />
                    <div className="imgs_detail">
                        {imgs}
                    </div>
                </div>
                <div className="detail_right">
                    <p className="name_detail" >{product.name}</p>
                    <p className="type_detali">Thể loại: {product.type.type}</p>
                    <p>{sold} đã bán</p>
                    {prices}
                    <p className="describe_detail">Mô tả:</p>
                    <ul className="describes_details">
                        {describes}
                    </ul>
                    <p>Vui lòng chọn sản phẩm để thêm vào giỏ hàng</p>
                    {details}
                    <br></br>
                    {select}
                </div>
            </div>
        )
    }else{
        return(
            <Empty />
        )
    }
    
}
export default Detail;