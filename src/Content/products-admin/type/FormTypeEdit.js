import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import getFactory from '../../../request/index';
import errorNotification from '../../../general/errorNotification';
import Notification from '../../../general/Notification';
const FormTypeEdit = ({ types, setShowEdit, setType, values }) => {
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
        try {
            const res = await API.editType(values.id, value)
            const index = types.data.findIndex(x => x.id === res.id)
            setType({ ...types, data: types.data.slice(0, index).concat(res).concat(types.data.slice(index + 1)) })
            setShowEdit(false)
            Notification("Chỉnh sửa tên nhóm sản phẩm thành công.")
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
                <Form.Item name="type" label="Tên nhóm:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên nhóm sản phẩm!',
                        },
                    ]}
                >
                    <Input />
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
export default FormTypeEdit;