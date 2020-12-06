/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import urls from '../const';
import { Avatar, Menu, Dropdown, Button, Badge } from 'antd';
import './index.css';
import { UserOutlined, LogoutOutlined, BellOutlined, ShoppingCartOutlined, FileDoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import getFactory from '../request/index';
import { useHistory } from 'react-router-dom';

const AvatarHeaderAdmin = ({ myuser, setUser }) => {
    const history = useHistory();



    if (myuser) {

        async function deleteToken() {
            const API = getFactory('user');
            await API.Logout()
        }

        const logout = async () => {
            try {
                await deleteToken();
            }
            finally {
                setUser('')
                localStorage.clear()
            }
        }

        const menu = () => {
            return (
                <Menu>
                    <Menu.Item key={1} className='menu_avatar'>
                        <a href="/home/profile"><UserOutlined /> Thông tin cá nhân</a>
                    </Menu.Item>
                    {/* <Menu.Item className='menu_avatar'>
                        <a href="/home/purchase"><FileDoneOutlined /> Danh sách đơn hàng</a>
                    </Menu.Item>
                    <Menu.Item className='menu_avatar'>
                        <a href="/home/address"><EnvironmentOutlined /> Danh sách địa chỉ</a>
                    </Menu.Item> */}
                    <Menu.Item key={2} className='menu_avatar'>
                        <span onClick={logout}><LogoutOutlined style={{ fontSize: '18px' }} /> Đăng xuất</span>
                    </Menu.Item>
                </Menu>
            )
        }

        return (
            <div>
                <a href="/home/notify" className="avatar_notify">
                    <Badge className='badge_header' count={1}>
                        <Avatar className='cart_header' icon={<BellOutlined />} />
                    </Badge>
                </a>

                <Dropdown className='avatar_user' overlay={menu} placement="bottomRight">
                    <span><Avatar src={`${urls}${myuser.avatar}`} />  {`${myuser.last_name} ${myuser.first_name}`}</span>
                </Dropdown>
            </div>
        )
    }
    else {
        const login = () => {
            history.push('/login');
        }
        return (
            <Button onClick={login} className='button-login' >Đăng nhập</Button>
        )
    }
}
export default AvatarHeaderAdmin;