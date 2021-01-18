import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, Radio, InputNumber, Drawer } from 'antd'
import getFactory from '../../request/index'
import Notification from '../../general/Notification'
import Catch from '../../general/Catch'
import moment from 'moment';
import { Fragment } from 'react';

const FormPromotion = ({ show, setShow, promotions, setPromotions, values }) => {
    const [times, setTimes] = useState({ time_from: values.time_from, time_to: values.time_to })
    const [showMaxValue, setShowMaxValue] = useState(false)
    const [form] = Form.useForm()
    const { RangePicker } = DatePicker;
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };

    useEffect(() => {
        setTimes({ time_from: values.time_from, time_to: values.time_to })
        values.type ? setShowMaxValue(false) : setShowMaxValue(true)
    }, [values])

    useEffect(() => {
        form.setFieldsValue({
            ...values,
            time: values.time_from ? [moment(values.time_from, "HH:mm:ss DD/MM/YYYY"), moment(values.time_to, "HH:mm:ss DD/MM/YYYY")] : "",
            max_value: values.max_value ? values.max_value : ""
        })
    }, [values, form])

    async function onFinish(val) {
        const API = getFactory('promotion');
        val.time_from = times.time_from
        val.time_to = times.time_to
        val.max_value = val.max_value ? val.max_value : 0
        delete val.time
        console.log(val)
        try {
            if (values.index === -1) {
                const res = await API.createPromotions(val)
                setPromotions({ ...promotions, data: [res].concat(promotions.data) })
                Notification("Thêm mới khuyến mãi thành công!")
            } else {
                const res = await API.editPromotions(values.id, val)
                setPromotions({
                    ...promotions, data: promotions.data.slice(0, values.index)
                        .concat(res).concat(promotions.data.slice(values.index + 1))
                })
                Notification("Chỉnh sửa khuyến mãi thành công!")
            }
            setShow(false)
        } catch (e) {
            Catch(e)
        }
    }
    function onChange(dates, dateStrings) {
        setTimes({ time_from: dateStrings[0], time_to: dateStrings[1] })
        console.log(dates)

    }
    function changeType(val) {
        console.log(val)
        val.target.value ? setShowMaxValue(false) : setShowMaxValue(true)
    }
    console.log(times)
    // console.log("des", index, values)
    return (
        <Drawer
            title={values.index === -1 ? "Tạo mới khuyến mãi" : "Chỉnh sửa khuyến mãi"}
            placement="right"
            visible={show}
            onClose={() => setShow(false)}
            width={500}
        >
            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} initialValues={values}>
                <Form.Item name="name" label="Tên:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="time" label="Thời gian:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập thời gian!',
                        },
                    ]}
                >
                    <RangePicker
                        ranges={{
                            'Hôm nay': [moment(), moment()],
                            'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                        format="HH:mm:ss DD/MM/YYYY"
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item name="type" label="Loại:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập loại!',
                        },
                    ]}
                >
                    <Radio.Group
                        onChange={changeType}
                    >
                        <Radio value={1}>Đồng</Radio>
                        <Radio value={0}>%</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="value"
                    label="Giá trị:"
                    dependencies={['type']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá trị',
                        },
                        ({ getFieldValue }) => ({

                            validator(_, value) {
                                if (!value || (getFieldValue('type') === 0 && value <= 100 && value > 0) || getFieldValue('type')) {
                                    console.log("t", getFieldValue('type'))
                                    return Promise.resolve();
                                }
                                console.log("t", getFieldValue('type'))
                                return Promise.reject('Giá trị phải nằm trong khoảng từ 0 đến 100%!');
                            },
                        }),
                    ]}
                >
                    <InputNumber
                        min="0"
                        formatter={value => showMaxValue ? `${value}%` : `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </Form.Item>
                {showMaxValue ?
                    <Form.Item name="max_value" label="Giá trị tối đa:"
                        rules={[
                            {
                                required: false,
                                message: 'Vui lòng nhập giá trị tối đa',
                            },
                        ]}
                    >
                        <InputNumber
                            min="0"
                            formatter={value => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />

                    </Form.Item>
                    : <Fragment />}

                <Form.Item name="comment" label="Mô tả:">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit submit_form" type="primary" htmlType="submit">
                        {values.index === -1 ? "Thêm mới" : "Chỉnh sửa"}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
export default FormPromotion