import React from 'react';
import './index.css';
const profile = () => {
    return(
        <div className="profile">
            <div className="avatar">
            {/* <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
            />, */}
            </div>
            <div className="profile_user"></div>
        </div>
    )
}
export default profile;