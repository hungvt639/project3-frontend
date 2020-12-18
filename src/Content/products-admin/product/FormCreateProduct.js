import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import getFactory from '../../../request/index';
import errorNotification from '../../../general/errorNotification';
import Notification from '../../../general/Notification';
import { useHistory } from 'react-router-dom';
const FormProduct = ({ val, types, setShowCreate }) => {
    const history = useHistory()
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values) => {
        const API = getFactory('product')
        try {

            const res = await API.createProduct(values)
            Notification("Thêm mới sản phẩm thành công.")
            setShowCreate(false)
            history.push(`/home/detail/${res.data.id}`)


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
            <Form className="form_addr" {...layout} name="nest-messages" onFinish={onFinish} initialValues={val}>
                <Form.Item name="name" label="Tên sản phẩm:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên nhóm sản phẩm muốn thêm',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Nhóm sản phẩm" name="type" rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn nhóm sản phẩm',
                    },
                ]}>
                    <Select>
                        {types.map(t => <Select.Option key={t.id} value={t.id}>{t.type}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="from_saleprice" label="Giá từ:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá bán sản phẩm thấp nhất',
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item name="to_saleprice" label="Tới:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá bán sản phẩm cao nhất',
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item name="comments" label="Ghi chú:">
                    <Input />
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
export default FormProduct;