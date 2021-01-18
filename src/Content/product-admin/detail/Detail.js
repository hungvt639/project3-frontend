import React, { useState } from 'react';
import { Image } from 'antd';
import urls from '../../../const';
import { Button } from 'antd';
import Description from './Description';
import Avatar from './Avatar';
import ListImg from './ListImg';
import Describes from './Describes';

const Detail = ({ match, product, setProduct }) => {

    const [product_detail, setDetail] = useState({ id: 0 });

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


    const details = []
    for (const detail of product.details) {
        details.push(
            <Button className={(product_detail.id === detail.id) ? "detail_product_detail_activate button_boder select_detail" : "button_boder select_detail"} key={detail.id} onClick={() => setDetail(detail)}>{detail.size} - {detail.color}</Button>
        )
    }

    const sold = (product.sold < 1000) ? `${product.sold}` : `${(product.sold / 1000).toFixed(1)}k`

    return (
        <div className="detail1">
            <div className="detail">
                <div className="detail_left">
                    <Avatar id={match.params.id} product={product} setProduct={setProduct} />
                    {/* <div className="imgs_detail images_upload"> */}
                    <ListImg product={product} setProduct={setProduct} viewTable={false} />
                    {/* </div> */}
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
                            <Describes product={product} setProduct={setProduct} />
                        </ul>
                    </div>
                    {details}
                    <br></br>
                </div>
            </div>

            <div className="detail_description">
                <p className="check_descriptions">Chi tiết sản phẩm</p>
                {/* {descriptions} */}
                <Description product={product} setProduct={setProduct} />
                <div key={0} className="space_button"></div>
            </div>
        </div>

    )

}
export default Detail;