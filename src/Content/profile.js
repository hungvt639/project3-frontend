import React, {useEffect, useState} from 'react';
import './index.css';
import getFactory from '../request/index';
// import Notification from '../general/Notification';
import errorNotification from '../general/errorNotification';
import {useHistory} from 'react-router-dom';
import { Avatar, Form, Upload, Button, Input, Radio } from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import urls from '../const';
import ModalChangeProfile from './ModalChangeProfile';
const Profile = () => {
    const [visible, setVisible] = useState(false);
    const [myuser, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    const history = useHistory();
    const GetProfile = async () =>{
        const API = getFactory('user');
        try{
            const res = await API.getProfile();
            localStorage.setItem('user', JSON.stringify(res));
            setUser(res);
        }catch(e){
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if (e.request.status === 401){
                errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }else history.push("/sos");
        }
    }
    useEffect(()=>{
        if (localStorage.getItem('token')){
            GetProfile();
        }else history.push('/sos');     
    }, []);

    const changeAvatar = () =>{
        // console.log("change");
    }

    const onFinish = () => {
        setVisible(true);
    }

    return(
        <div className="profile">
            <div className="avatar">
                <span style={{backgroundColor:'red'}} onClick={changeAvatar}>
                    <Avatar className="avatar_user"
                    // size='170'
                    src={`${urls}${myuser.avatar}`}
                    />,
                    <FormChangAvatar/>
                </span>
            </div>
            <div className="profile_user">
                <Form {...layout} className="form_profile" onFinish={onFinish} initialValues={myuser}>
                    <Form.Item name="username" label="Tên tài khoản:">
                    <Input className="input_profile" readOnly />
                    </Form.Item>
                    <Form.Item name="email" label="Email:" >
                        <Input readOnly  />
                    </Form.Item>
                    <Form.Item name="name" label="Họ-Tên:" initialValue={`${myuser.last_name} ${myuser.first_name}`} >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ:">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name="birthday" label="Ngày sinh:">
                        <Input readOnly />
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
            </div>
            <ModalChangeProfile myuser={myuser} visible={visible} setVisible={setVisible} />
        </div>
        
    )
}
export default Profile;

const FormChangAvatar = () => {
    return(
        <Form>
            <Form.Item
                name="upload"
                valuePropName="fileList"
                // getValueFromEvent={normFile}
            >
                <Upload name="logo" action={normFile} listType="picture">
                <Button icon={<SyncOutlined />}></Button>
                </Upload>
            </Form.Item>
        </Form>
    )
}
const normFile = e => {
    console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e && e.fileList;
  };