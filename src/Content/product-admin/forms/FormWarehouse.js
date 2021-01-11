import React, { useEffect, useState, Fragment } from 'react';
import { Modal, Form, Input, Button, InputNumber, Image, Select } from 'antd'
import getFactory from '../../../request/index'
import Notification from '../../../general/Notification'
import Catch from '../../../general/Catch'
import urls from '../../../const'

const FormWarehouse = ({ show, setShow, product, setProduct, values, index }) => {
    const [other, setOther] = useState(false)
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        form.setFieldsValue(values)
    }, [values])
    const sizes = [
        'FreeSize', 'XS', 'S', 'X', 'L', 'XL', 'XXL', '28', '29', '30', '31', '32', '33'
    ]
    console.log('product', product)
    async function onFinish(val) {
        const API = getFactory('product');
        console.log(val)
        try {
            const data = []
            val.size.forEach(s => {
                if (s !== "Khác") {
                    data.push({ ...val, "size": s.trim(), "product": product.id })
                }
            });
            if (val.othersize) {
                val.othersize.split(";").forEach(s => {
                    data.push({ ...val, "size": s.trim(), "product": product.id })
                })
            }
            const res = await API.createDetail(data)
            setProduct({ ...product, details: res.data.reverse().concat(product.details) })
            Notification("Thêm mới thành công!")
            setShow(false)
        } catch (e) {
            Catch(e)
        }
    }

    function handleChange(val) {
        if (val.includes("Khác")) setOther(true)
        else setOther(false)
    }
    return (
        <Modal
            title={index === -1 ? "Tạo mới sản phẩm" : "Chỉnh sửa sản phẩm"}
            visible={show}
            onCancel={() => setShow(false)}
            footer={null}
        >
            <h2 className="tabletable_h1">{product.name}</h2>
            <div className="tabletable_img"><Image width="100px" src={`${urls}${product.avatar}`} alt="Ảnh chính" /></div>

            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} initialValues={values}>
                <Form.Item name="size" label="Size:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập size.',
                        },
                    ]}
                >
                    <Select
                        mode='multiple'
                        style={{ width: '100%' }}
                        placeholder="Chọn size"
                        onChange={handleChange}
                        optionLabelProp="label"
                    >
                        {sizes.map((s, i) => <Select.Option key={i} value={s} >{s}</Select.Option>)}
                        <Select.Option key={-1} value="Khác" >Khác</Select.Option>

                    </Select>
                </Form.Item>

                {other ? <Form.Item name="othersize" label="Size khác"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập size! Các saize khác nhau cách nhau bởi dấu chấm phẩy "; ".',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> : <Fragment />}


                <Form.Item name="color" label="Màu sắc:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập màu sắc.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Giá:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá sản phẩm.',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="saleprice" label="Giá bán:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá bán sản phẩm.',
                        },
                    ]}
                >
                    <InputNumber />
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
export default FormWarehouse