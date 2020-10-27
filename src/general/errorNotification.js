import React from 'react'
import { notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';



const errorNotification = (des) => {
    notification.open({
        className: 'notify',
        message: 'Thông báo',
        top:70,
        description: des,
        icon: <CloseCircleOutlined style={{ color: '#FF0000' }} />,

    });
};

export default errorNotification;