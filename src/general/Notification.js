import React from 'react'
import { notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';


const Notification = (des) => {
    notification.open({
        className: 'notify',
        message: 'Thông báo',
        description: des,
        duration:1,
        top:70,
        icon: <CheckCircleOutlined style={{ color: '#00FF00' }} />,

    });
};
export default Notification;