import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import urls from '../../const';
import { PlusOutlined } from '@ant-design/icons';

const ListImg = ({ product, setProduct }) => {
    var fileList = product.image.map(i => ({ ...i, status: "done", name: i.img, uid: `${i.id}`, url: `${urls}${i.img}` }));
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            // file.preview = await getBase64(file.originFileObj);
        }
    }
    console.log(fileList)
    return (

        <>
            <Upload
                action={`${urls}/product/image/`}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                // onChange={this.handleChange}
                headers={{ Authorization: "Token " + localStorage.getItem("token"), }}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {/* <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> */}
        </>
    )

}
export default ListImg;