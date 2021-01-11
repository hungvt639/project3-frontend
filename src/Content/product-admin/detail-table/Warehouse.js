import React, { useState, Fragment } from 'react'
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Popconfirm, Empty } from 'antd'
import FormWarehouse from '../forms/FormWarehouse'
import getFactory from '../../../request/index'
import Catch from '../../../general/Catch'
import Notification from '../../../general/Notification'
const Warehouse = ({ product, setProduct }) => {
    const [show, setShow] = useState(false)
    const [values, setValues] = useState({ color: "", price: "", product: "", saleprice: "", size: [] })
    const [index, setIndex] = useState(-1)
    async function deletes(id, i) {
        const API = getFactory('product')
        try {
            await API.deleteDetail(id)
            setProduct({ ...product, details: product.details.slice(0, i).concat(product.details.slice(i + 1)) })
            Notification("Xóa chi tiết sản phẩm thành công!")
        } catch (e) {
            Catch(e)
        }
    }
    return (
        <Fragment>
            <div className="tabledetails_des">
                <div className="tabledetails_add">
                    <button onClick={() => { setValues({ color: "", price: "", product: "", saleprice: "", size: [] }); setIndex(-1); setShow(true) }} ><PlusCircleOutlined /> Thêm mới</button>
                </div>
                <div className="products-admin-1">
                    <div className="products-admin-2">
                        <table className="products-admin-table">
                            <thead className="products-admin-table-1">
                                <tr>
                                    <th className="tabledetail_center">Size</th>
                                    <th className="tabledetail_center">Màu</th>
                                    <th className="tabledetail_center">Giá</th>
                                    <th className="tabledetail_center">Giá bán</th>
                                    <th className="tabledetail_center">Kho</th>
                                    <th className="tabledetail_center">Cập nhật</th>
                                    <th className="tabledetail_center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableWarehouse details={product.details} setValues={setValues} setIndex={setIndex} setShow={setShow} deletes={deletes} />
                            </tbody>
                        </table>
                        {product.details.length ? <Fragment /> : <Empty />}
                    </div>
                </div>
            </div>
            <FormWarehouse show={show} setShow={setShow} product={product} setProduct={setProduct} index={index} values={values} />
        </Fragment>

    )
}
export default Warehouse

const TableWarehouse = React.memo(({ details, setValues, setIndex, setShow, deletes }) => {
    function edit(des, i) {
        // console.log(des, i)
        setIndex(i)
        setValues(des)

        setShow(true)
    }
    return (
        <Fragment>
            {details.length ? details.map((t, i) => {
                return (
                    <tr key={t.id}>
                        <td className="tabledetail_center">{t.size}</td>
                        <td className="tabledetail_center">{t.color}</td>
                        <td className="tabledetail_center">{t.price.toLocaleString('vi-VN')}₫</td>
                        <td className="tabledetail_center">{t.saleprice.toLocaleString('vi-VN')}₫</td>
                        <td className="tabledetail_center">{t.amount}</td>
                        <td className="tabledetail_act">
                            <span className="tabledetail_act_btn" style={{ color: "#ff6600", borderColor: "#ff6600" }}><MinusOutlined /></span>
                            <span className="tabledetail_act_btn" style={{ color: "#ff6600", borderColor: "#ff6600" }}><PlusOutlined /></span>
                        </td>
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
