import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import AvatarHeader from './AvatarHeader';
import { Layout, Row, Col } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const Headers = ({toggle, collapsed, myuser, setUser}) => {


    return(
        <Header className="site-layout-background" style={{ padding: 0, background:'#FF6000' }}>
            <Row>
                <Col span={2}>{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    style: {marginTop:'10px' ,marginLeft: '24px', fontSize : '40px', lineHeight:1},
                    onClick: toggle,
                })}</Col>
                {/* <Col span={3}></Col> */}
                <Col span={10} className='margin_right'><AvatarHeader myuser={myuser} setUser={setUser} /></Col>
            </Row>
          </Header>
    );
};
export default Headers