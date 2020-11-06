import React, {useEffect, useState} from 'react';
import './index.css';
import getFactory from '../request/index';
import errorNotification from '../general/errorNotification';
import {useHistory, Redirect } from 'react-router-dom';
import urls from '../const';
import ModalChangeProfile from './ModalChangeProfile';
import ChangePassword from './ChangePassword';
import Avatar from './Avatar'
const Profile = () => {
    const [visible, setVisible] = useState(false);
    const [myuser, setUser] = useState(JSON.parse(localStorage.getItem('user')));
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


    const onFinish = () => {
        setVisible(true);
    }
    const checked = (val, sex) =>{
        if (val === sex) return "checked";
        else return "";
    }
    if(myuser){
        return(
            <div className="profile">
                <div className="avatar">
                    <Avatar myuser={myuser} />
                </div>
                <div className="profile_user">
                    <form className="form_input">
                        <div className="item_input"><label>Họ-Tên: </label><input name="name" readOnly value={`${myuser.last_name} ${myuser.first_name}`}/></div>
                        <div className="item_input"><label>Email: </label><input name="email" readOnly value={myuser.email} /></div>
                        <div className="item_input"><label>Số điện thoại: </label><input name="phone" readOnly value={myuser.phone} /></div>
                        <div className="item_input"><label>Địa chỉ: </label><input name="address" readOnly value={myuser.address} /></div>
                        <div className="item_input"><label>Ngày sinh: </label><input name="birthday" readOnly value={myuser.birthday} /></div>
                        <div className="item_input"><label>Giới tính: </label><div style={{width:"100%"}}>
                            <input type="radio" style={{width:"auto"}} checked={checked(1, myuser.sex)} /><span style={{marginRight:"20px"}}> Nam</span>
                            <input type="radio" style={{width:"auto"}} checked={checked(2, myuser.sex)} /><span style={{marginRight:"20px"}}> Nữ</span>
                            <input type="radio" style={{width:"auto"}} checked={checked(0, myuser.sex)} /><span> Khác</span>
                        </div></div>
                        <div className="item_input button_edit_profile"><input style={{width:"200px"}} type="button" value="Chỉnh sửa thông tin" onClick={onFinish}/></div>
                    </form>
                    <div className="hr"></div>
                    <ChangePassword />
                </div>
                <ModalChangeProfile myuser={myuser} setUser={setUser} visible={visible} setVisible={setVisible} />
            </div>
            
        )
    }
    else{
        return <Redirect to="/sos" />
    }
}
export default Profile;

// const FormChangAvatar = () => {
//     return(
//         <Form>
//             <Form.Item
//                 name="upload"
//                 valuePropName="fileList"
//                 // getValueFromEvent={normFile}
//             >
//                 <Upload name="logo" action={normFile} listType="picture">
//                 <Button icon={<SyncOutlined />}></Button>
//                 </Upload>
//             </Form.Item>
//         </Form>
//     )
// }
// const normFile = e => {
    // console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e && e.fileList;
//   };