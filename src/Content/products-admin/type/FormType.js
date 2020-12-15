import React from 'react';
import { Form, Input, Button } from 'antd';
import getFactory from '../../../request/index';
import errorNotification from '../../../general/errorNotification';
import Notification from '../../../general/Notification';
const FormType = ({ setShowCreate, setType, page, limit }) => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values) => {
        const API = getFactory('product')
        try {
            const res = await API.createType(`?page=${page}&limit=${limit}`, values)
            setType(res)
            setShowCreate(false)
            Notification("Thêm mới nhóm sản phẩm thành công.")
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
            <Form className="form_addr" {...layout} name="nest-messages" onFinish={onFinish}>

                <Form.Item name="type" label="Tên nhóm:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên nhóm sản phẩm muốn thêm',
                        },
                    ]}
                >
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
export default FormType;