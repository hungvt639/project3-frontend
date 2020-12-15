import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import getFactory from '../../../request/index';
import errorNotification from '../../../general/errorNotification';
import Notification from '../../../general/Notification';
const WarehouseFormEdit = ({ details, setShowEdit, setDetails, values }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(values)
    }, [form, values])
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (value) => {
        const API = getFactory('product')
        console.log(values)
        try {
            const res = await API.editDetail(values.id, value)
            const index = details.data.findIndex(x => x.id === res.id)
            setDetails({ ...details, data: details.data.slice(0, index).concat(res).concat(details.data.slice(index + 1)) })
            setShowEdit(false)
            Notification("Chỉnh sửa phẩm thành công.")
        }
        catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }

    return (
        <>
            <Form form={form} initialValues={values} className="form_addr" {...layout} name="nest-messages" onFinish={onFinish}>
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
                        Chỉnh sửa
                        </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default WarehouseFormEdit;