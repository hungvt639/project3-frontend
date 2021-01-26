import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import getFactory from '../../../request/index';
import Notification from '../../../general/Notification';
import Catch from '../../../general/Catch';
const FormProduct = ({ val, types, setShowCreate, number, setNumber }) => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values) => {
        const API = getFactory('product')
        try {

            await API.createProduct(values)
            Notification("Thêm mới sản phẩm thành công.")
            setShowCreate(false)
            setNumber(number + 1)
        }
        catch (e) {
            Catch(e)
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