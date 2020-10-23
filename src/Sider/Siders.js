import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Layout } from 'antd';
import {useHistory} from 'react-router-dom';
import {
    HomeOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const Siders = ({collapsed}) => {
    const history=useHistory()
    const getDefaultSelectKey = () =>{
        const key = localStorage.getItem('selectkey');
        if (key) return key;
        else return '1';
    }
    return (
        <Sider className="sider" trigger={null} collapsible collapsed={collapsed}
            width="250"
            
            style={{
                background:'#FF6000',
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo" />
            <Menu className="menu" mode="inline" defaultSelectedKeys={[getDefaultSelectKey()]}>
                <Menu.Item onClick={()=>{history.push('/home'); localStorage.setItem('selectkey', '1')}} key="1" icon={<HomeOutlined style={{fontSize:'20px'}} />}>
                    Trang chủ
                </Menu.Item>
                <Menu.Item onClick={()=>{history.push('/home'); localStorage.setItem('selectkey', '2')}} key="2" icon={<VideoCameraOutlined style={{fontSize:'20px'}}  />}>
                    nav 2
                </Menu.Item>
                <Menu.Item onClick={()=>{history.push('/home'); localStorage.setItem('selectkey', '3')}} key="3" icon={<UploadOutlined style={{fontSize:'20px'}}  />}>
                    nav 3
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default Siders