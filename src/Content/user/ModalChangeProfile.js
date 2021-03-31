import React from 'react';
import '../index.css';
import getFactory from '../../request/index';
import Notification from '../../general/Notification';
import errorNotification from '../../general/errorNotification';
import { Form, Button, Input, Radio, Modal, DatePicker, Space } from 'antd';
import moment from 'moment';
const ModalChangeProfile = ({ myuser, setUser, visible, setVisible }) => {
    var birthday = myuser.birthday;
    const dateFormat = 'DD-MM-YYYY';
    const API = getFactory('user');
    const chaneProfile = async (data) => {
        try {
            const res = await API.EditProfile(data);
            setUser(res);
            localStorage.setItem('user', JSON.stringify(res));
            Notification("Cập nhật thông tin thành công");

        } catch (e) {
            if (e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const value_date = () => {
        if (myuser.birthday) return moment(myuser.birthday, dateFormat);
        else return "";
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const onFinish = (values) => {
        values.birthday = birthday;
        chaneProfile(values);
        setVisible(false);
    }
    const onChangeDate = (date, dateString) => {
        birthday = dateString
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (
        <Modal
            title="Sửa đổi thông tin cá nhân"
            visible={visible}
            onCancel={handleCancel}
            footer={null}

        >
            <Form {...layout} name="nest-messages" onFinish={onFinish} initialValues={myuser}>
                <Form.Item name="email" label="Email:"
                    rules={[
                        {
                            type: 'email',
                            message: 'Định dạng Email không đúng',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập Email của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="last_name" label="Họ:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Họ của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="first_name" label="Tên:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Tên của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Số điện thoại của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ:">
                    <Input />
                </Form.Item>
                <Form.Item name="birthday" label="Ngày sinh:">
                    <Space>
                        <DatePicker onChange={onChangeDate} name='birthday' defaultValue={value_date} format={dateFormat} />
                    </Space>

                </Form.Item>
                <Form.Item name="sex" label="Giới Tính:">
                    <Radio.Group name="sex" initialValues={myuser.sex}>
                        <Radio value={1}>Nam</Radio>
                        <Radio checked value={2}>Nữ</Radio>
                        <Radio value={0}>Khác</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit" type="primary" htmlType="submit">
                        Chỉnh sửa thông tin
                        </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default ModalChangeProfile;

