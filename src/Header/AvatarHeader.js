import React, {useEffect} from 'react';
import urls from '../const';
import { Avatar,  Menu, Dropdown, Button, Badge } from 'antd';
import './index.css';
import { UserOutlined, LogoutOutlined, BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import getFactory from '../request/index';
import {useHistory} from 'react-router-dom';
import errorNotification from '../general/errorNotification'

const AvatarHeader = ({myuser, setUser, cart, setCart}) => {
    const history = useHistory();
    
    useEffect(()=>{
        const getCarts = async ()=>{
            const API = getFactory('cart')
            try{
                const res = await API.getCart()
                setCart(res.data)
            }catch(e){
                if(e.request.status === 0){
                    errorNotification("Lỗi mạng!");
                }else if(e.response.data.message){
                    e.response.data.message.map(x => errorNotification(x))
                }else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }
        }
        getCarts()
    },[])

    if(myuser) {

        async function deleteToken(){
            const API = getFactory('user');
            await API.Logout()
        }

        const logout = async () => {
            try{
               await deleteToken();
            }
            finally{
                setUser('')
                localStorage.clear()
            }
        }

        const menu = () => {
            return(
                <Menu>
                    <Menu.Item className='menu_avatar'>
                        <a href="/home/profile"><UserOutlined /> Thông tin cá nhân</a>
                    </Menu.Item>
                    <Menu.Item className='menu_avatar'>
                        <span onClick={logout}><LogoutOutlined style={{fontSize:'18px'}} /> Đăng xuất</span>
                    </Menu.Item>
                </Menu>
            )
        }

        return(
            <div>
                <a href="/home/cart" className="avatar_cart">
                    <Badge className='badge_header' count={cart.length}>
                        <Avatar className="cart_header" icon={<ShoppingCartOutlined />} />
                    </Badge>
                </a>
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
    else{
        const login = () => {
            history.push('/login');
        }
        return(
            <Button onClick={login} className='button-login' >Đăng nhập</Button>
    )}
}
export default AvatarHeader;