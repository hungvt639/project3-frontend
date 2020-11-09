import React, {useState} from 'react';
import {Upload, Modal, Menu, Dropdown} from 'antd'
import urls from '../const';
import ImgCrop from 'antd-img-crop';
import getFactory from '../request/index';
import errorNotification from '../general/errorNotification';
import Notification from '../general/Notification';
import {useHistory} from 'react-router-dom'
const Avatar = ({myuser, setUser}) => {
    // const [files, setFile] = useState({});
    var files = new FormData()
    const [visibleAvatar, setVisibleAvatar] = useState(false);
    const showAvatar = () => {
        setVisibleAvatar(true);
    }
    const hideAvatar = () => {
        setVisibleAvatar(false);
    }

    
    //   const onChange = ({ fileList: newFileList }) => {
    //         setFileList(newFileList);
    //         console.log(newFileList)
    //   };

    const onChange = (infor) => {
        console.log(infor)
        if(infor.file.status==="error"){
            if(infor.file.response){
                for(const e in infor.file.response){
                    errorNotification(infor.file.response[e]);
                }
            }else errorNotification("Lỗi mạng!");
        }
        if(infor.file.status === "done"){
            Notification("Cập nhật ảnh đại diện thành công");
            setUser({...myuser, avatar:infor.file.response.avatar})
        }
    };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };


    

    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={showAvatar} >Xem ảnh</a>
            </Menu.Item>
            <Menu.Item>
                <ImgCrop rotate>
                    <Upload
                        name="avatar"
                        action={`${urls}/user/change-avatar/`}
                        showUploadList={false}
                        headers={
                            {
                                Authorization:  "Token " + localStorage.getItem("token"),
                            }
                        }
                        onChange={onChange}
                        onPreview={onPreview}
                    >Đổi ảnh đại diện</Upload>
                    
                </ImgCrop>
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