import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import AvatarHeaderAdmin from './AvatarHeaderAdmin';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const HeaderAdmin = ({ toggle, collapsed, myuser, setUser }) => {


    return (
        <Header className="header" >
            <div className="triggers">{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                // style: { marginTop: '10px', marginLeft: '24px', fontSize: '40px', lineHeight: 1 },
                onClick: toggle,
            })}</div>
            <div className="head_user"><AvatarHeaderAdmin myuser={myuser} setUser={setUser} /></div>
        </Header>
    );
};
export default HeaderAdmin;