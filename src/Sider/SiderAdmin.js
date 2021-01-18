import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import { HomeOutlined, FolderOutlined, OrderedListOutlined, GiftOutlined } from '@ant-design/icons';
import logo1 from '../image/logo1.png'
const { Sider } = Layout;
const SiderAdmin = ({ url, collapsed }) => {
    const history = useHistory()
    // console.log('props1', url)
    var getDefaultSelectKey = "1"

    const keys = {
        "/": "1",
        "/products": "2",
        "/products/type": "2",
        "/products/warehouse": "2",
        "/products/warehouse-history": "2",
        "/orders": "3",
        "/promotions": "4"

    }
    if (url in keys) {
        getDefaultSelectKey = keys[url]
    }


    return (
        <Sider className="sider" trigger={null} collapsible collapsed={collapsed}
            width="250"

            style={{
                // background: 'rgb(57, 59, 63)',
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo">
                <img src={logo1} alt="Logo" /> <span>Shop Online</span>
            </div>
            <Menu className="menu" mode="inline" defaultSelectedKeys={[getDefaultSelectKey]}>
                <Menu.Item className="menu_item" onClick={() => { history.push('/') }} key="1" icon={<HomeOutlined className="icon_sider" />}>
                    Trang chủ
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/products') }} key="2" icon={<FolderOutlined className="icon_sider" />}>
                    Sản phẩm
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/orders') }} key="3" icon={<OrderedListOutlined className="icon_sider" />}>
                    Đơn hàng
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/promotions') }} key="4" icon={<GiftOutlined className="icon_sider" />}>
                    Khuyến mãi
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default SiderAdmin