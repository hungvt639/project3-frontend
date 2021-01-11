
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd'
import getFactory from '../../../request/index'
import urls from '../../../const'
import errorNotification from '../../../general/errorNotification'
import Notification from '../../../general/Notification'
import { CloseOutlined } from '@ant-design/icons';
import Catch from '../../../general/Catch'
import { Fragment } from 'react';
import axios from 'axios';

const FormDescriptions = ({ show, setShow, product, setProduct, values, index }) => {

    const [image, setImage] = useState({ image: values.img ? `${urls}${values.img}` : "", img: "" })
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };


    useEffect(() => {
        form.setFieldsValue(values)
        setImage({ image: values.img ? `${urls}${values.img}` : "", img: "" })
    }, [values])

    function getBase64(file) {
        var reader = new FileReader();
        reader.onloadend = function () {
            setImage({ "image": reader.result, "img": file })
        }
        reader.readAsDataURL(file);
        return reader
    }
    // const handleImageChange = (val) => {
    //     getBase64(val.target.files[0])
    // }

    async function onFinish(val) {
        const API = getFactory('product');

        if (val.text || image.img) {
            let formData = new FormData();

            // try {
            if (index === -1) {
                formData.append(`data[0]`, val.text)
                formData.append(`data[0]`, image.img)
                formData.append('product', product.id)

            } else {
                formData.append("text", val.text)
                formData.append("img", image.img)
            }
            axios({
                method: (index === -1) ? 'post' : 'put',
                url: `${urls}/product/description/${(index === -1) ? "" : `${values.id}/`}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: "*/*",
                    Authorization: "Token " + localStorage.getItem("token"),
                }
            })
                .then(function (response) {
                    if (index === -1) {
                        setProduct({ ...product, "description": product.description.concat(response.data) })
                        Notification("Thêm mô tả chi tiết mới thành công!")
                    } else {
                        setProduct({ ...product, description: product.description.slice(0, index).concat(response.data).concat(product.description.slice(index + 1)) })
                        Notification("Chỉnh sửa chi tiết sản phẩm thành công!")
                    }

                })
                .catch(function (e) {
                    Catch(e)
                });
            setShow(false)
        } else {
            errorNotification("Vui lòng nhập chi tiết hoặc thêm ảnh")
        }
    }
    // console.log("img", image)
    // console.log("des", index, values)
    function removeImg() {
        setImage({ image: "", img: "" })
    }
    return (
        <Modal
            title={index === -1 ? "Tạo mới chi tiết sản phẩm" : "Chỉnh sửa chi tiết sản phẩm"}
            visible={show}
            onCancel={() => setShow(false)}
            footer={null}
        >

            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} initialValues={values}>
                <Form.Item name="text" label="Chi tiết:">
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Ảnh:">
                    <label name="img" className="custom-file-upload">
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg" onChange={(val) => getBase64(val.target.files[0])} />
                        {image.image ? <img className="description_inputs_img" src={image.image} alt="ảnh" /> : <div className="description_inputs_image"><p>+</p><p>Ảnh</p></div>}
                    </label>
                    {image.image ? <div onClick={removeImg} className="des_close" name="close"><CloseOutlined /></div> : <Fragment />}
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit" type="primary" htmlType="submit">
                        {index === -1 ? "Thêm mới" : "Chỉnh sửa"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FormDescriptions