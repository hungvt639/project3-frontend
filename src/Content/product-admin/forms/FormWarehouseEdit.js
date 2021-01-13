import React, { useEffect, useState, Fragment } from 'react';
import { Modal, Form, Input, Button, InputNumber, Image, Select } from 'antd'
import getFactory from '../../../request/index'
import Notification from '../../../general/Notification'
import Catch from '../../../general/Catch'
import urls from '../../../const'

const FormWarehouseEdit = ({ showEdit, setShowEdit, setValues, product, setProduct, values, index }) => {
    const [other, setOther] = useState(false)
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const sizes = [
        'FreeSize', 'XS', 'S', 'X', 'L', 'XL', 'XXL', '28', '29', '30', '31', '32', '33'
    ]
    useEffect(() => {
        if (sizes.includes(values.size)) {
            setOther(false)
            form.setFieldsValue(values)
        } else {
            setOther(true)
            form.setFieldsValue({ ...values, size: "Khác", othersize: values.size })
        }

    }, [values])

    console.log('product', product)
    async function onFinish(val) {
        const API = getFactory('product');

        try {

            if (val.size === "Khác") {
                val.size = val.othersize.trim()
            }
            console.log('val', val)
            console.log('values', values)
            const res = await API.editDetail(values.id, val)
            setProduct({ ...product, details: product.details.slice(0, index).concat(res).concat(product.details.slice(index + 1)) })

            Notification("Chỉnh sửa thành công!")
            setShowEdit(false)
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
            title="Chỉnh sửa sản phẩm"
            visible={showEdit}
            onCancel={() => setShowEdit(false)}
            footer={null}
        >
            <h2 className="tabletable_h1">{product.name}</h2>
            <div className="tabletable_img"><Image width="100px" src={`${urls}${product.avatar}`} alt="Ảnh chính" /></div>

            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>
                <Form.Item name="size" label="Size:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập size.',
                        },
                    ]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn size"
                        onChange={handleChange}
                        optionLabelProp="label"
                    >
                        {sizes.map((s, i) => <Select.Option key={i} value={s} >{s}</Select.Option>)}
                        <Select.Option key={-1} value="Khác" >Khác</Select.Option>

                    </Select>
                </Form.Item>

                {other ? <Form.Item name="othersize" label="Size khác" placeholder="Nhập 1 size duy nhất"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập size!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> : <Fragment />}


                <Form.Item name="color" label="Màu sắc:" placeholder="Nhập màu sắc"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập màu sắc.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Giá:" placeholder="Nhập giá"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá sản phẩm.',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="saleprice" label="Giá bán:" placeholder="Nhập giá bán"
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
                    <Button className="change_profile_submit submit_form" type="primary" htmlType="submit">
                        Chỉnh sửa
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FormWarehouseEdit