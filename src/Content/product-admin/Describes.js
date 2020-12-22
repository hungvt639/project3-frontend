import React, { useState } from 'react';
import { Form, Input, Button, } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
const Describes = ({ product, setProduct }) => {
    const [form] = Form.useForm()
    const API = getFactory('product');
    const describes = []
    const [number, setNumber] = useState(1);
    const deleteDescribe = async (id) => {
        try {
            await API.deleteDescribes(id)
            setProduct({ ...product, describe: product.describe.filter(x => x.id !== id) })
            Notification("Xóa mô tả thành công")
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
    for (const describe of product.describe) {
        describes.push(<li className="li_describe" key={describe.id}> {describe.context} <button onClick={() => deleteDescribe(describe.id)} className="button_delete_describe">Xóa</button></li>)
    }
    const onFinish = async (values) => {
        values = values.describes.map(val => ({ ...val, product: product.id }))
        try {
            const res = await API.createListDescribes(values)
            setProduct({ ...product, describe: product.describe.concat(res.data) })
            setNumber(1)
            Notification("Thêm mới mô tả thành công")
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
    return (
        <>
            {describes}

            <Form form={form} initialValues={[{}]} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="describes">
                    {(fields, { add, remove }) => (
                        <>
                            {number ? remove(fields.map((f, i) => i)) : ""}
                            {fields.map(field => (
                                <div key={field.fieldKey} className="antd_space_item">
                                    <Form.Item className="antd_space_item_form"
                                        {...field}
                                        name={[field.name, 'context']}
                                        fieldKey={[field.fieldKey, 'context']}
                                        rules={[{ required: true, message: 'Điền mô tả' }]}
                                    >
                                        <Input placeholder="Mô tả" />
                                    </Form.Item>

                                    <CloseOutlined className="antd_space_item2" onClick={() => remove(field.name)} />
                                </div>
                                // <Space key={field.key} style={{ display: 'flex', marginBottom: 0 }} align="baseline" className="antd_space_item">

                                // </Space>
                            ))}
                            <Form.Item className="antd_button_from_list">
                                <Button type="dashed" onClick={() => { add(); setNumber(0) }} block icon={<PlusOutlined />}>
                                    Mô tả
                                </Button>
                            </Form.Item>
                            {fields.length ? <Form.Item>
                                <Button type="primary" htmlType="submit" className="antd_button_from_submit">
                                    Thêm
                                </Button>
                            </Form.Item> : ""}

                        </>
                    )}
                </Form.List>
            </Form>
        </>
    )
}
export default Describes;