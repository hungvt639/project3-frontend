/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import SiderAdmin from "./Sider/SiderAdmin";
import Headers from "./Header/Headers";
import HeaderAdmin from "./Header/HeaderAdmin";
import Contents from "./Content/Contents";
import ContentAdmin from "./Content/ContentAdmin";
import { Layout } from 'antd';
import getFactory from './request/index';
import { Fragment } from 'react';
const Layouts = (props) => {
    const paths = [
        "/register",
        "/login"
    ]
    const [cart, setCart] = useState([]);
    // const [search, setSearch] = useState({});
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const [myuser, setUser] = useState(JSON.parse(localStorage.getItem('user')));



    if (paths.includes(props.location.pathname)) {
        return (
            <Fragment />
        )
    }
    if (myuser && myuser.groups[0].name === "admin") {
        return (
            <Layout>
                <SiderAdmin url={props.location.pathname} collapsed={collapsed} />
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
                <Layout className="site-layout">
                    <Headers myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />
                    <Contents myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />
                </Layout>
            </Layout>
        )
    }
}
export default Layouts;