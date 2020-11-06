import React, {useState} from 'react';
import {Popover, Modal, Menu, Dropdown} from 'antd'
import urls from '../const';
const Avatar = ({myuser}) => {
    const [visibleAvatar, setVisibleAvatar] = useState(false);
    const showAvatar = () => {
        setVisibleAvatar(true);
    }
    const hideAvatar = () => {
        setVisibleAvatar(false);
    }
    const menu = (
        // <div>
        //     <button onClick={showAvatar}>Xem ảnh</button>
        //     <button>Đổi ảnh đại diện</button>
        // </div>
        <Menu>
            <Menu.Item>
                <a onClick={showAvatar} >Xem ảnh</a>
            </Menu.Item>
            <Menu.Item>
                <a>Đổi ảnh đại diện</a>
            </Menu.Item>
        </Menu>
      );
    return(
        <div>
            <Dropdown overlay={menu} trigger={['click']}>
                <img className="img_avatar" src={`${urls}${myuser.avatar}`} onClick={e => e.preventDefault()} />
            </Dropdown>
            
            <p>{`${myuser.last_name} ${myuser.first_name}`}</p>
            <Modal
                width={"80%"}
                visible={visibleAvatar}
                onCancel={hideAvatar}
                footer={null}
                >
                <img className="img_avt" src={`${urls}${myuser.avatar}`} />
            </Modal>
        </div>
        
    )
}
export default Avatar;