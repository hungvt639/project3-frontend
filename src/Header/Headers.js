import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import AvatarHeader from './AvatarHeader';
import { Layout } from 'antd';
import { useHistory } from 'react-router-dom'
import {
    HomeFilled,
} from '@ant-design/icons';

const { Header } = Layout;

const Headers = ({ myuser, setUser, cart, setCart }) => {
    const history = useHistory()
    const goHome = () => {
        history.push('/home')
    }

    return (
        <div className="header_user">
            <div className="head_space">
                <Header className="header" >
                    <div className="goHome" onClick={goHome}>{React.createElement(HomeFilled, {
                        className: 'trigger',
                        style: { marginLeft: "24px", marginTop: '10px', color: "#fff", fontSize: '40px', lineHeight: 1 },

                    })} Trang chủ
                    </div>

                    <div className="head_user"><AvatarHeader myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} /></div>
                </Header>
            </div>
        </div>

    );
};
export default Headers