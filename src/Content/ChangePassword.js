import React from 'react';
import {Form, Input} from 'antd';
import getFactory from '../request/index';
import Notification from '../general/Notification';
import errorNotification from '../general/errorNotification';
const ChangePassword = () => {
    const API = getFactory('user');
    const editPassword = async (values) => {
        try{
            const res = await API.changePassword(values);
            Notification(res.message)
            debugger
        }
        catch (e){
            debugger
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if (e.request.status === 400){
                errorNotification(e.response.data.message);
            }else errorNotification(e.message);
        }
    }
    const onFinish = (values) => {
        editPassword(values)
    }

    return(
        <Form className="form_input" onFinish={onFinish} layout="vertical">
            <Form.Item className="input_change_pass" name="old_password" label="Mật khẩu cũ" hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Nhập mật khẩu cũ của bạn',
                },]}>
                <Input.Password />
            </Form.Item>
            <div className="input_inline">
                <Form.Item className="input_change_pass" name="password" label="Mật khẩu" hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Nhập mật khẩu mới của bạn',
                    },]}>   
                    <Input.Password />
                </Form.Item>

                <Form.Item className="input_change_pass input_inline_right" name="confirm" label="Nhập lại mật khẩu" dependencies={['password']} hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Nhập lại mật khẩu mới của bạn',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Mật khẩu mới không trùng khớp');
                        },
                    }),]}>
                    <Input.Password />
                </Form.Item>
            </div>
            
            <div className="item_input button_edit_profile"><input style={{width:"200px"}} type="submit" value="Đổi mật khẩu" /></div>

        </Form>
    )
}
export default ChangePassword;