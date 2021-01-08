import React, { useEffect } from 'react';
import './index.css';
import 'antd/dist/antd.css';
import AvatarHeader from './AvatarHeader';
import { Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import getFactory from '../request/index'
import {
    HomeFilled,
} from '@ant-design/icons';

const { Header } = Layout;

const Headers = ({ myuser, setUser, cart, setCart }) => {
    const history = useHistory()
    const goHome = () => {
        history.push('/')
    }
    useEffect(() => {
        const getProfile = async () => {
            const API = getFactory('user');
            try {
                const res = await API.getProfile()
                localStorage.setItem('user', JSON.stringify(res));
                setUser(res)
            }

            catch (e) {
                // setUser(0)
            }
        }
        getProfile()
    }, [setUser])
    return (
        <div className="header_user">
            <div className="head_space">
                <Header className="header" >
                    <div className="goHome" onClick={goHome}>{React.createElement(HomeFilled, {
                        className: 'trigger',
                    })} Trang chủ
                    </div>
                    <div className="head_user"><AvatarHeader myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} /></div>
                </Header>
            </div>
        </div>

    );
};
export default Headers