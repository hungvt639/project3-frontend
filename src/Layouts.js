/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import Siders from "./Sider/Siders";
import SiderAdmin from "./Sider/SiderAdmin";
import Headers from "./Header/Headers";
import HeaderAdmin from "./Header/HeaderAdmin";
import Contents from "./Content/Contents";
import ContentAdmin from "./Content/ContentAdmin";
import { Layout } from 'antd';
import getFactory from './request/index';
const Layouts = () => {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState({});
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const [myuser, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const getProfile = async () => {
            const API = getFactory('user');
            try {
                const res = await API.getProfile()
                localStorage.setItem('user', JSON.stringify(res));
                setUser(res)
            }
            catch (e) {
                setUser(0)
            }
        }
        getProfile()
    }, [])


    if (myuser && myuser.groups[0].name === "admin") {
        return (
            <Layout>
                <SiderAdmin collapsed={collapsed} />
                <Layout className="site-layout">
                    <HeaderAdmin toggle={toggle} collapsed={collapsed} myuser={myuser} setUser={setUser} />
                    <ContentAdmin myuser={myuser} setUser={setUser} />
                </Layout>
            </Layout>
        )
    }
    else {
        return (
            <Layout>
                {/* <Siders collapsed={collapsed} search={search} setSearch={setSearch} /> */}
                <Layout className="site-layout">
                    <Headers myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />
                    <Contents myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />
                </Layout>
            </Layout>
        )
    }
}
export default Layouts;