import React, {useEffect, useState} from 'react';
import './index.css';
import getFactory from '../request/index';
// import Notification from '../general/Notification';
import errorNotification from '../general/errorNotification';
import {useHistory} from 'react-router-dom';
import { Avatar, Form, Upload, Button, Input, Radio, Modal } from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import urls from '../const';
const ModalChangeProfile = ({myuser, visible, setVisible}) => {
    const API = getFactory('user');
    const chaneProfile = async (data) => {
        try{
            const res = await API.EditProfile(data);
            console.log(res);
        }catch(e){
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if (e.request.status === 400){
                errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }else errorNotification(e.message);
        }
    }
 
    const handleCancel = () => {
        setVisible(false);
    }
    const onFinish = (values) => {
        values = {...values, avatar:myuser.avatar}
        chaneProfile(values);
        setVisible(false);
        console.log(values)
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    return(
        <Modal
            title="Sửa đổi thông tin cá nhân"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            
        >
                <Form {...layout} name="nest-messages" onFinish={onFinish} initialValues={myuser}>
                    <Form.Item name="email" label="Email:" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="last_name" label="Họ:" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="first_name" label="Tên:" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại">
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ:">
                        <Input />
                    </Form.Item>
                    <Form.Item name="birthday" label="Ngày sinh:">
                        <Input />
                    </Form.Item>
                    <Form.Item name="sex" label="Giới Tính:">
                    <Radio.Group name="sex" defaultValue={myuser.sex}>
                        <Radio value={1}>nam</Radio>
                        <Radio checked value={2}>Nữ</Radio>
                        <Radio value={0}>Khác</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                        Chỉnh sửa sửa thông tin
                        </Button>
                    </Form.Item>
                </Form>
        </Modal>
    );
}
export default ModalChangeProfile;

