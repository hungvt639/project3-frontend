import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import getFactory from '../../../request/index';
import errorNotification from '../../../general/errorNotification';
import Notification from '../../../general/Notification';
import { useHistory } from 'react-router-dom';

const WarehouseForm = ({ types, setShowCreate, number, setNumber }) => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const [products, setProducts] = useState([])
    const [type, setType] = useState(types[0].id)
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        const API = getFactory('product')
        const getProduct = async () => {
            try {
                const res = await API.getProducts(`?type=${type}`)
                setProducts(res.data)
                if (res.data.length) form.setFieldsValue({ "product": res.data[0].id })
                else form.setFieldsValue({ "product": null })
            } catch { console.log("lỗi") }
        }
        getProduct()
    }, [type])
    console.log("products1", products)
    const onFinish = async (values) => {
        const API = getFactory('product')
        console.log(values)
        try {

            await API.createDetail(values)
            setNumber(number + 1)
            Notification("Thêm mới sản phẩm thành công.")
            setShowCreate(false)
        }
        catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const onGenderChangeType = async (val) => {
        console.log(val)
        setType(val)
    }
    const onGenderChange = () => {

    }
    return (
        <>
            <Form form={form} initialValues={{ "product": products.length ? products[0].id : null }} className="form_addr" {...layout} name="nest-messages" onFinish={onFinish} >

                <Form.Item name="type" label="Nhóm sản phẩm" rules={[{ required: true }]} initialValue={type}>
                    <Select
                        // defaultValue={type}
                        placeholder="Chọn nhóm sản phẩm"
                        onChange={onGenderChangeType}
                        allowClear
                    >
                        {types.map(x => <Option key={x.id} value={x.id}>{x.type}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name="product" label="Tên sản phẩm" rules={[{ required: true, message: "Vui lòng chọn tên sản phẩm" }]} initialValue={products.length ? products[0].id : null}>
                    <Select
                        placeholder="Chọn tên sản phẩm"
                        onChange={onGenderChange}
                        allowClear
                    >
                        {products.map(x => <Option key={x.id} value={x.id}>{x.name}</Option>)}
                        {/* <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option> */}
                    </Select>
                </Form.Item>
                <Form.Item name="size" label="Size:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập size.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
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
                        Thêm mới
                        </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default WarehouseForm;