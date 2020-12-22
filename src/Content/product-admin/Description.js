import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import DescriptionInputs from './DescriptionInputs';
import urls from './../../const';
import axios from 'axios';
const Description = ({ product, setProduct }) => {
    const API = getFactory('product');
    const [descriptions, setDescriptions] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        let counts = 0
        descriptions.forEach((des, i) => {
            if (des.text || des.img) {
                formData.append(`data[${i}]`, des.text ? des.text : "")
                formData.append(`data[${i}]`, des.img ? des.img : "")
                counts++
            }
        })
        if (counts) {
            formData.append('product', product.id)
            axios({
                method: 'post',
                url: `${urls}/product/description/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: "*/*",
                    Authorization: "Token " + localStorage.getItem("token"),
                }
            })
                .then(function (response) {
                    setProduct({ ...product, "description": product.description.concat(response.data) })
                    setDescriptions([])
                    Notification("Thêm mô tả chi tiết mới thành công!")
                })
                .catch(function (e) {
                    if (e.request.status === 0) {
                        errorNotification("Lỗi mạng!");
                    } else if (e.response.data.message) {
                        e.response.data.message.map(x => errorNotification(x))
                    } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
                });
        }
        else errorNotification("Không có dữ liệu")
    }
    const deleteDescription = async (id, i) => {
        try {
            await API.deleteDescription(id)
            setProduct({ ...product, "description": product.description.slice(0, i).concat(product.description.slice(i + 1)) })
            Notification("Xóa mô tả chi tiết thành công!")
        } catch (e) {
            if (e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const descriptionss = product.description.map((des, i) => <div key={des.id} className="descriptions">
        <div className="descriptions1">
            {des.text ? <p className="description_text">{des.text}</p> : <div></div>}
            {(des.img) ? <img className="description_img" src={`${urls}${des.img}`} alt="" /> : <div></div>}
        </div>
        <button onClick={() => deleteDescription(des.id, i)} className="button_delete_describe">Xóa</button>
    </div>)
    const addInput = () => {
        setDescriptions(descriptions.concat({}))
    }
    return (
        <>
            {descriptionss}

            <form className="description_form" onSubmit={handleSubmit}>
                {descriptions.map((description, index) => <DescriptionInputs key={index} descriptions={descriptions} description={description} index={index} setDescriptions={setDescriptions} />)}
                <Button type="dashed" onClick={addInput} block icon={<PlusOutlined />}>Chi tiết</Button>
                {descriptions.length ? <div className="description_form_submit"><input type="submit" value="Thêm" /></div> : ""}
            </form>
        </>
    )
}
export default Description;