import React, {useState} from 'react';
import '../index.css';
import {Redirect } from 'react-router-dom';
import ModalChangeProfile from './ModalChangeProfile';
import ChangePassword from './ChangePassword';
import Avatar from './Avatar';
const Profile = ({myuser, setUser}) => {
    const [visible, setVisible] = useState(false);
    
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
                    <Avatar myuser={myuser} setUser={setUser} />
                </div>
                <div className="profile_user">
                    <form className="form_input">
                        <div className="item_input"><label>Họ-Tên: </label><input name="name" disabled={true} value={`${myuser.last_name} ${myuser.first_name}`}/></div>
                        <div className="item_input"><label>Email: </label><input name="email" disabled={true} value={myuser.email} /></div>
                        <div className="item_input"><label>Số điện thoại: </label><input name="phone" disabled={true} value={myuser.phone} /></div>
                        <div className="item_input"><label>Địa chỉ: </label><input name="address" disabled={true} value={myuser.address} /></div>
                        <div className="item_input"><label>Ngày sinh: </label><input name="birthday" disabled={true} value={myuser.birthday} /></div>
                        <div className="item_input"><label>Giới tính: </label><div style={{width:"100%"}}>
                        <div className="sex_list">
                            <label className="sex_input"> Nam
                                <input type="radio"  defaultChecked={checked(1, myuser.sex)} />
                            </label>
                            <label className="sex_input"> Nữ
                                <input type="radio" defaultChecked={checked(2, myuser.sex)} />
                            </label>
                            <label className="sex_input"> Khác
                                <input type="radio" defaultChecked={checked(0, myuser.sex)} />
                            </label>
                        </div>
                        
 
                            {/* <input type="radio" style={{width:"auto"}} defaultChecked={checked(1, myuser.sex)} /><span style={{marginRight:"20px"}}> Nam</span>
                            <input type="radio" style={{width:"auto"}} defaultChecked={checked(2, myuser.sex)} /><span style={{marginRight:"20px"}}> Nữ</span>
                            <input type="radio" style={{width:"auto"}} defaultChecked={checked(0, myuser.sex)} /><span> Khác</span> */}
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
