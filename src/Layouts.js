import React, {useState} from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import Siders from "./Sider/Siders";
import SiderAdmin from "./Sider/SiderAdmin";
import Headers from "./Header/Headers";
import HeaderAdmin from "./Header/HeaderAdmin";
import Contents from "./Content/Contents";
import ContentAdmin from "./Content/ContentAdmin";
import { Layout } from 'antd';

const Layouts = ({myuser, setUser}) => {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState({});
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => {
    setCollapsed(!collapsed);
  };
    if(myuser && myuser.groups[0].name === "admin"){
        return(
            <Layout>
                <SiderAdmin collapsed={collapsed} />
                <Layout className="site-layout">
                    <HeaderAdmin toggle={toggle} collapsed={collapsed} myuser={myuser} setUser={setUser} />
                    <ContentAdmin myuser={myuser} setUser={setUser} />
                </Layout>
            </Layout>
        )
    }
    else{
        return(
            <Layout>
                <Siders collapsed={collapsed} search={search} setSearch={setSearch} />
                <Layout className="site-layout">
                    <Headers toggle={toggle} collapsed={collapsed} myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />
                    <Contents myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />
                </Layout>
            </Layout>
        )
    }
}
export default Layouts;