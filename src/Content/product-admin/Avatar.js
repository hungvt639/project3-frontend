import React, { useState } from 'react';
import { Image, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import { LoadingOutlined } from '@ant-design/icons';
import urls from '../../const';
const Avatar = ({ id, product, setProduct }) => {
    const [loading, setLoading] = useState(false)
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            errorNotification("Chỉ hỗ trợ định dạng ảnh JPG và PNG!")
        }
        return isJpgOrPng;
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            setProduct({ ...product, avatar: info.file.response.avatar })
            setLoading(false)
            Notification("Cập nhật ảnh chính thành công")
        }
    };
    return (
        <div>
            <Image className="avatar_detail" width="100%" src={`${urls}${product.avatar}`} alt="Ảnh chính" />
            <ImgCrop
                aspect={6 / 7}
                quality={1}
                modalTitle="Cắt ảnh">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className={loading ? "avatar-uploader-loading" : "avatar-uploader"}
                    showUploadList={false}
                    action={`${urls}/product/product/${id}/`}
                    beforeUpload={beforeUpload}
                    headers={{ Authorization: "Token " + localStorage.getItem("token"), }}
                    onChange={handleChange}>
                    {loading ? <span className="avatar-uploader-button_loading"><LoadingOutlined /></span> : <span className="avatar-uploader-button">Thay đổi</span>}
                    {/* <SyncOutlined className="avatar-uploader-button" /> */}
                </Upload>
            </ImgCrop>
        </div>
    )
}
export default Avatar;