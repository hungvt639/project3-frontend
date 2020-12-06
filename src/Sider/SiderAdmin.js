import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    HomeOutlined, FolderOutlined, OrderedListOutlined
} from '@ant-design/icons';
const { Sider } = Layout;
const SiderAdmin = ({ collapsed }) => {
    const history = useHistory()
    const getDefaultSelectKey = () => {
        const key = localStorage.getItem('selectkey');
        if (key) return key;
        else return '1';
    }
    return (
        <Sider className="sider" trigger={null} collapsible collapsed={collapsed}
            width="250"

            style={{
                background: '#FF6000',
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo" />
            <Menu className="menu" mode="inline" defaultSelectedKeys={[getDefaultSelectKey()]}>
                <Menu.Item className="menu_item" onClick={() => { history.push('/home'); localStorage.setItem('selectkey', '1') }} key="1" icon={<HomeOutlined className="icon_sider" />}>
                    Trang chủ
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/home/products'); localStorage.setItem('selectkey', '2') }} key="2" icon={<FolderOutlined className="icon_sider" />}>
                    Sản phẩm
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/home/orders'); localStorage.setItem('selectkey', '3') }} key="3" icon={<OrderedListOutlined className="icon_sider" />}>
                    Đơn hàng
                </Menu.Item>
                {/* <Menu.Item className="menu_item" onClick={() => { history.push('/home'); localStorage.setItem('selectkey', '3') }} key="4" icon={<UploadOutlined className="icon_sider" />}>
                    nav 4
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
}
export default SiderAdmin