import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import DescriptionInputs from './DescriptionInputs';
const Description = ({ product, setProduct }) => {
    const API = getFactory('product');
    const [number, setNumber] = useState(1);

    const [descriptions, setDescriptions] = useState([{}, {}])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("descriptions", descriptions)
            const data = []
            // for (const i of descriptions) {
            //     i.product = product.id
            //     if (i.text || i.img) data.push(i)
            // }
            for (const i of descriptions) {
                if (i.text || i.img) {
                    const des = new FormData()
                    des.append('product', product.id)
                    des.append('text', i.text)
                    des.append('img', i.img)
                    data.push(des)
                    debugger
                }
            }
            // const datas = new FormData()
            // datas.append('des', data)
            console.log("data", data)
            // // values = values.description.map(x => ({ ...x, "product": product.id, "img": values.img.file.originFileObj }))
            // console.log(values)
            const res = await API.createDescription(data)
            console.log(res)
        }
        catch (e) {
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
    // console.log(descriptions)
    return (

        <div className="App">
            <form onSubmit={handleSubmit}>
                {descriptions.map((description, index) => <DescriptionInputs key={index} descriptions={descriptions} description={description} index={index} setDescriptions={setDescriptions} />)}
                <input type="submit" />
            </form>
        </div>
    )
}
export default Description;