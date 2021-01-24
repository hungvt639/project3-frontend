import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Image, Modal } from 'antd';
import getFactory from '../../../request/index';
import errorNotification from '../../../general/errorNotification';
import Notification from '../../../general/Notification';
import urls from '../../../const';
const FormAmount = ({ product, setProduct, showAsAmountm, setShowAsAmount, valueAsAmount }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            "price": "",
            "amount": "",
            "note": ""
        })
    }, [form, valueAsAmount])
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (value) => {
        value.is_plus = valueAsAmount.is_plus
        value.detail = valueAsAmount.id
        const API = getFactory('product')
        try {
            await API.createAmount(value)
            // const index = details.data.findIndex(x => x.id === valueAsAmount.detail.id)
            // setDetails({ ...details, data: details.data.slice(0, index).concat({ ...details.data[index], amount: valueAsAmount.is_plus ? valueAsAmount.detail.amount + value.amount : valueAsAmount.detail.amount - value.amount }).concat(details.data.slice(index + 1)) })
            setProduct({
                ...product, details: product.details.slice(0, valueAsAmount._index)
                    .concat({
                        ...product.details[valueAsAmount._index], amount: valueAsAmount.is_plus ?
                            valueAsAmount.amount + value.amount : valueAsAmount.amount - value.amount
                    })
                    .concat(product.details.slice(valueAsAmount._index + 1))
            })
            Notification("Cập nhật số lượng trong kho thành công!")
            setShowAsAmount(false)
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
        <Modal
            title={valueAsAmount.is_plus ? "Thêm số lượng sản phẩm vào kho" : "Bớt số lượng sản phẩm trong kho"}
            visible={showAsAmountm}
            onCancel={() => setShowAsAmount(false)}
            footer={null}
            width="400px"
        >
            <p className="amount-add-name">{product.name}</p>
            <div className="amount-add-image"><Image width="70px" src={`${urls}${product.avatar}`} /></div>
            <div className="amount-add-atr"><p>Size: {valueAsAmount.size} </p><p>Màu: {valueAsAmount.color} </p></div>
            <p className="amount-add-amo">{valueAsAmount.amount} sản phẩm có sẵn trong kho</p>
            <Form form={form} className="form_addr amount-add-form" {...layout} name="nest-messages" onFinish={onFinish}>
                <Form.Item name="price" label="Giá:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá sản phẩm!',
                        },
                    ]}
                >
                    <InputNumber className="amount-add-input" min={1} formatter={value => `${value}₫`} step={1} />
                </Form.Item>
                <Form.Item name="amount" label="Số lượng:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số lượng sản phẩm!',
                        },
                    ]}
                >
                    <InputNumber className="amount-add-input" min={1} step={1} />
                </Form.Item>
                <Form.Item name="note" label="Ghi chú:">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit" type="primary" htmlType="submit">
                        {valueAsAmount.is_plus ? "Thêm" : "Bớt"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FormAmount;