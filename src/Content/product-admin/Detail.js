import React, { useState, useEffect } from 'react';
import { Image, Empty } from 'antd';
import urls from '../../const';
import './index.css';
import { Button } from 'antd';
// import AddCart from './AddCart';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import { Redirect } from 'react-router-dom';
import Description from './Description';
import Avatar from './Avatar';
import ListImg from './ListImg';
import Describes from './Describes';
const Detail = ({ props }) => {

    // localStorage.removeItem('ordercart');
    console.log(props)
    const [product, setProduct] = useState({})
    const [product_detail, setDetail] = useState({ id: 0 });
    const id = window.location.href.split('/').pop();
    useEffect(() => {
        const getDetailProduct = async (id) => {
            const API = getFactory('product');
            try {
                const res = await API.getDetailProduct(id);
                setProduct(res.product);
            } catch (e) {
                if (e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.request.status === 400) {
                    errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
                } else if (e.request.status === 404) {
                    return <Redirect to="/sos" />
                } else errorNotification(e.message);
            }
        }
        const id = window.location.href.split('/').pop();
        getDetailProduct(id)
    }, [])


    if (Object.keys(product).length) {
        const prices = (product_detail.id !== 0) ?
            <p id="price">
                Giá: {product_detail.saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
            </p> : (product.from_saleprice !== product.to_saleprice) ?
                <p id="price">
                    Giá: {product.from_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i> -
                {product.to_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
                </p> : <p id="price">
                    Giá: {product.from_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
                </p>;


        const imgs = []
        for (const i of product.image) {
            imgs.push(<Image width="100px" key={i.id} className="img_detail" src={`${urls}${i.img}`} />);
        }


        // const describes = []
        // for (const describe of product.describe) {
        //     describes.push(<li key={describe.id}> {describe.context}</li>)
        // }


        const details = []
        for (const detail of product.details) {
            details.push(
                <Button className={(product_detail.id === detail.id) ? "detail_product_detail_activate button_boder select_detail" : "button_boder select_detail"} key={detail.id} onClick={() => setDetail(detail)}>{detail.size} - {detail.color}</Button>
            )
        }

        // const select = (product_detail.id !== 0) ? <AddCart product_detail={product_detail} cart={cart} setCart={setCart} myuser={myuser} /> : <br></br>;
        // const select = <AddCart product_detail={product_detail} cart={cart} setCart={setCart} myuser={myuser} />;
        const sold = (product.sold < 1000) ? `${product.sold}` : `${(product.sold / 1000).toFixed(1)}k`
        const descriptions = product.description.map(des => <Description key={des.id} description={des} />)
        descriptions.push(<div key={0} className="space_button"></div>)
        const check_descriptions = (descriptions.length - 1) ? <p className="check_descriptions">Chi tiết sản phẩm</p> : <div></div>
        console.log(product)
        return (
            <div>
                <div className="detail">
                    <div className="detail_left">
                        <Avatar id={id} product={product} setProduct={setProduct} />
                        <div className="imgs_detail">
                            {/* {imgs} */}
                            <ListImg product={product} setProduct={setProduct} />
                        </div>
                    </div>
                    <div className="detail_right">
                        <p className="name_detail" >{product.name}</p>
                        <div className="type_sold_detali">
                            <span>Thể loại: {product.type.type}</span>
                            <div className="type_detali"></div>
                            <span>{sold} đã bán</span>
                        </div>

                        <div className="price_detail">{prices}</div>
                        <div className="describe_detail">
                            <p>Mô tả sản phẩm</p>
                            <ul className="describes_details">
                                {/* {describes} */}
                                <Describes product={product} setProduct={setProduct} />
                            </ul>
                        </div>

                        {/* <p className='mess_detail'>{mess}</p> */}
                        {details}
                        <br></br>
                        {/* {select} */}
                    </div>
                </div>

                <div className="detail_description">
                    {check_descriptions}
                    {descriptions}
                </div>
            </div>

        )
    } else {
        return (
            <Empty />
        )
    }

}
export default Detail;