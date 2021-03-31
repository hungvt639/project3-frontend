import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, TreeSelect } from 'antd'
import getFactory from '../../request/index'
import errorNotification from '../../general/errorNotification'

import Notification from '../../general/Notification'
import Catch from '../../general/Catch'

const FormAddProducts = ({ show, setShow, promotion, promotions, setPromotions, index }) => {

    // const [form] = Form.useForm()
    const { SHOW_PARENT } = TreeSelect;
    const [values, setValues] = useState()
    const [types, setTypes] = useState([])
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        async function getType() {
            const API = getFactory('promotion')
            try {
                const res = await API.getProduct(promotion.id)
                setTypes(res)
            } catch { }
        }
        getType()
    }, [promotion.id])
    const treeData = types.map((x, i) => {
        return (
            {
                title: x.type,
                value: x.id,
                key: x.id,
                children: x.products.map((p, i) => {
                    return (
                        {
                            title: p.name,
                            value: p.id,
                            key: p.id,
                        }
                    )
                })
            }
        )
    })


    async function onFinish(val) {
        let data = []
        if (val.promotion) {
            for (const i of val.promotion) {
                if (Number.isInteger(i)) {
                    const t = types.filter(x => x.id === i)
                    for (const j of t[0].products) {
                        data.push({ promotion: promotion.id, product: j.id })
                    }
                } else {
                    data.push({ promotion: promotion.id, product: i })
                }
            }
            const API = getFactory('promotion')
            try {
                const res = await API.addProducts(data)
                setPromotions({
                    ...promotions,
                    data: promotions.data.slice(0, index)
                        .concat({
                            ...promotion,
                            promotions: promotion.promotions.concat(res)
                        })
                        .concat(promotions.data.slice(index + 1))
                })
                Notification("Thêm thành công")
                setShow(false)
            } catch (e) { Catch(e) }
        } else {
            errorNotification("Vui lòng chọn trước khi bấm thêm")
        }

    }
    function onChange(value) {
        setValues(value)
    };
    const tProps = {
        treeData,
        value: values,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };

    return (
        <Modal
            title="Thêm sản phẩm khuyến mãi"
            visible={show}
            onCancel={() => setShow(false)}
            width={600}
            footer={null}
        >
            <Form className="promotion_forms" {...layout} name="nest-messages" onFinish={onFinish}>
                <Form.Item name="promotion" label="Sản phẩm:">
                    <TreeSelect {...tProps} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit submit_form" type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FormAddProducts