import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomePage from './home';
import profile from './profile';
import { Route, Switch } from 'react-router-dom';
const { Content } = Layout;


const Contents = () => {
    return(
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    maxHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                <Switch>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/home/profile" component={profile} />
                </Switch>
                <div style={{height: 50}}></div>
            </Content>

            
 
        
    )
}
export default Contents;