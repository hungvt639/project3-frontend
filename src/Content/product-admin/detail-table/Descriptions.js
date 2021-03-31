import React, { useState, Fragment } from 'react'
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Empty, Image } from 'antd'
import urls from '../../../const'
import FormDescriptions from '../forms/FormDescriptions'
import getFactory from '../../../request/index'
import Catch from '../../../general/Catch'
import Notification from '../../../general/Notification';
const Descriptions = ({ product, setProduct }) => {

    const [show, setShow] = useState(false)
    const [values, setValues] = useState({ text: "", img: "" })
    const [index, setIndex] = useState(-1)

    async function deletes(id, i) {
        const API = getFactory('product')
        try {
            await API.deleteDescription(id)
            setProduct({ ...product, description: product.description.slice(0, i).concat(product.description.slice(i + 1)) })
            Notification("Xóa chi tiết sản phẩm thành công!")
        } catch (e) {
            Catch(e)
        }
    }

    return (
        <Fragment>
            <div className="tabledetails_des">
                <div className="tabledetails_add">
                    <button onClick={() => { setValues({ text: "", img: "" }); setIndex(-1); setShow(true) }} ><PlusCircleOutlined /> Thêm mới</button>
                </div>
                <div className="products-admin-1">
                    <div className="products-admin-2">
                        <table className="products-admin-table">
                            <thead className="products-admin-table-1">
                                <tr>
                                    <th>Chi tiết sản phẩm</th>
                                    <th className="tabledetail_center">Ảnh</th>
                                    <th className="tabledetail_center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableDescription description={product.description} setValues={setValues} setIndex={setIndex} setShow={setShow} deletes={deletes} />
                            </tbody>
                        </table>
                        {product.description.length ? <Fragment /> : <Empty />}
                    </div>
                </div>
            </div>
            <FormDescriptions show={show} setShow={setShow} product={product} setProduct={setProduct} index={index} values={values} />
        </Fragment>

    )
}
export default Descriptions
const TableDescription = React.memo(({ description, setValues, setIndex, setShow, deletes }) => {

    function edit(des, i) {
        setValues(des)
        setIndex(i)
        setShow(true)
    }
    return (
        <Fragment>
            {description.length ? description.map((t, i) => {
                return (
                    <tr key={t.id}>
                        <td>{t.text}</td>
                        <td className="tabledetail_center tabledetail_images ">{t.img ? <Image width="60px" height="80px" src={`${urls}${t.img}`} /> : <Fragment />}</td>
                        <td className="tabledetail_act">
                            <span onClick={() => edit(t, i)} className="tabledetail_act_btn" style={{ color: "#ff6600", borderColor: "#ff6600" }}><EditOutlined /></span>
                            <Popconfirm
                                placement="topRight"
                                title="Bạn có chắc chắn muốn xóa?"
                                onConfirm={() => deletes(t.id, i)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <span className="tabledetail_act_btn" style={{ color: "#808080", borderColor: "#808080" }}><DeleteOutlined /></span>
                            </Popconfirm>
                        </td>
                    </tr>
                )
            })
                :
                <Fragment></Fragment>}
        </Fragment>
    )
})
