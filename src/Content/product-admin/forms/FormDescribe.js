import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd'
import getFactory from '../../../request/index'
import Notification from '../../../general/Notification'
import Catch from '../../../general/Catch'

const FormDescribe = ({ show, setShow, product, setProduct, values, index }) => {
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };

    useEffect(() => {
        form.setFieldsValue(values)
    }, [values, form])

    async function onFinish(val) {
        const API = getFactory('product');
        // console.log(val)
        try {
            if (index === -1) {
                val.product = product.id
                const res = await API.createListDescribes([val])
                setProduct({ ...product, describe: product.describe.concat(res.data) })
                Notification("Thêm mới mô tả thành công")
            } else {
                const res = await API.editDescribes(values.id, val)
                setProduct({ ...product, describe: product.describe.slice(0, index).concat(res).concat(product.describe.slice(index + 1)) })
                Notification("Chỉnh sửa mô tả thành công")
            }
            setShow(false)
        } catch (e) {
            Catch(e)
        }
    }
    // console.log("des", index, values)
    return (
        <Modal
            title={index === -1 ? "Tạo mới mô tả" : "Chỉnh sửa mô tả"}
            visible={show}
            onCancel={() => setShow(false)}
            footer={null}
        >



            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} initialValues={values}>
                <Form.Item name="context" label="Mô tả:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit submit_form" type="primary" htmlType="submit">
                        {index === -1 ? "Thêm mới" : "Chỉnh sửa"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FormDescribe