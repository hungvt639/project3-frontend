import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd'
import getFactory from '../../../request/index'
import urls from '../../../const'
import ImgCrop from 'antd-img-crop'
import errorNotification from '../../../general/errorNotification'
import Notification from '../../../general/Notification'
import { LoadingOutlined } from '@ant-design/icons';
import { Upload } from 'antd'
import Catch from '../../../general/Catch'

const FormEditProduct = ({ showEdit, setShowEdit, valuesEdit, number, setNumber }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ ...valuesEdit, type: valuesEdit.type ? valuesEdit.type.id : 0 })
    }, [form, valuesEdit])
    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    console.log('valuesEdit', valuesEdit)
    useEffect(() => {
        const getTypes = async () => {
            const API = getFactory('product');
            try {
                const res = await API.getType("")
                setTypes(res.data)
            } catch { }
        }
        getTypes()
    }, [])

    async function onFinish(val) {
        const API = getFactory('product');
        try {
            const res = await API.editProduct(valuesEdit.id, val)
            res.type = types.filter(t => t.id === res.type)[0]
            setNumber(number + 1)
            setShowEdit(false)
            Notification("Chỉnh sửa thông tin thành công!")
        } catch (e) {
            Catch(e)
        }
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            errorNotification("Chỉ hỗ trợ định dạng ảnh JPG và PNG!")
        }
        return isJpgOrPng;
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            setNumber(number + 1)
            setLoading(false)
            setShowEdit(false)
            Notification("Cập nhật ảnh chính thành công")
        }
    };
    return (
        <Modal
            title="Chỉnh sửa thông tin sản phẩm"
            visible={showEdit}
            onCancel={() => setShowEdit(false)}
            footer={null}
        >
            <ImgCrop
                aspect={6 / 7}
                quality={1}
                modalTitle="Cắt ảnh">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className={loading ? "avatar-uploader-loading tabledetail_upload " : "avatar-uploader tabledetail_upload"}
                    showUploadList={false}
                    action={`${urls}/product/product/${valuesEdit.id}/`}
                    beforeUpload={beforeUpload}
                    headers={{ Authorization: "Token " + localStorage.getItem("token"), }}
                    onChange={handleChange}>
                    {loading ? <span className="tabledetail_upload_loading"><LoadingOutlined /></span> : <img className="tabledetail_upload_avt" src={`${urls}${valuesEdit.avatar}`} alt="ảnh" />}
                    {/* <SyncOutlined className="avatar-uploader-button" /> */}
                </Upload>
            </ImgCrop>

            <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
                <Form.Item name="name" label="Tên sản phẩm:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm muốn thêm',
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
                    <Button className="change_profile_submit submit_form" type="primary" htmlType="submit">
                        Chỉnh sửa
                        </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FormEditProduct