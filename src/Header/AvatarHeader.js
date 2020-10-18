import React from 'react';
import urls from '../const';
import { Avatar,  Menu, Dropdown, Button } from 'antd';
import './index.css';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import getFactory from '../request/index'
import {useHistory} from 'react-router-dom'

const AvatarHeader = ({myuser, setUser}) => {
    const history = useHistory();
    const API = getFactory('user');
     async function deleteToken(){
        await API.Logout()
     }

    const logout = () => {

        try{deleteToken();}
        finally{
            localStorage.clear()
            setUser('')
        }
    }

    const login = () => {
        history.push('/login');
    }

    const menu = () => {
        return(
            <Menu>
                <Menu.Item>
                    <a href="/profile"><UserOutlined /> Thông tin cá nhân</a>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={logout}><LogoutOutlined /> Đăng xuất</p>
                </Menu.Item>
            </Menu>
        )
    }

    if(myuser) {
        return(
            <Dropdown className='margin_right' overlay={menu} placement="bottomRight">
                <span className='avatar text-avata'><Avatar src={`${urls}${myuser.avatar}`} />  {`${myuser.first_name} ${myuser.last_name}`}</span> 
            </Dropdown>
        )
    }
    else{
    return(
        <Button size='large' onClick={login} className='button-login' >Đăng nhập</Button>
    )}
}
export default AvatarHeader;