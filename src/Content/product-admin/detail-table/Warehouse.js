import React, { useState, Fragment } from 'react'
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Popconfirm, Empty } from 'antd'
import FormWarehouse from '../forms/FormWarehouse'
import FormWarehouseEdit from '../forms/FormWarehouseEdit'
import getFactory from '../../../request/index'
import Catch from '../../../general/Catch'
import Notification from '../../../general/Notification'
import FormAmount from '../forms/FormAmount'
const Warehouse = ({ product, setProduct }) => {
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showAsAmountm, setShowAsAmount] = useState(false)
    const [valueAsAmount, setValueAsAmount] = useState({ is_plus: true })
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
                    <button onClick={() => { setValues({ color: "", price: "", product: "", saleprice: "", size: [] }); setShow(true) }} ><PlusCircleOutlined /> Thêm mới</button>
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
                                <TableWarehouse
                                    details={product.details}
                                    setValues={setValues}
                                    setIndex={setIndex}
                                    setShowEdit={setShowEdit}
                                    deletes={deletes}
                                    setValueAsAmount={setValueAsAmount}
                                    setShowAsAmount={setShowAsAmount}
                                />
                            </tbody>
                        </table>
                        {product.details.length ? <Fragment /> : <Empty />}
                    </div>
                </div>
            </div>
            <FormWarehouse show={show} setShow={setShow} product={product} setProduct={setProduct} values={values} />
            <FormWarehouseEdit showEdit={showEdit} setShowEdit={setShowEdit} product={product} setProduct={setProduct} values={values} setValues={setValues} index={index} />
            <FormAmount product={product} setProduct={setProduct} showAsAmountm={showAsAmountm} setShowAsAmount={setShowAsAmount} valueAsAmount={valueAsAmount} />
        </Fragment>

    )
}
export default Warehouse

const TableWarehouse = React.memo(({ details, setValues, setIndex, setShowEdit, deletes, setValueAsAmount, setShowAsAmount }) => {
    function edit(des, i) {
        setIndex(i)
        setValues(des)
        setShowEdit(true)
    }
    function setPlus(t, i) {
        setValueAsAmount({ ...t, is_plus: true, _index: i })
        setShowAsAmount(true)
    }
    function setMinus(t, i) {
        setValueAsAmount({ ...t, is_plus: false, _index: i })
        setShowAsAmount(true)
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
                            <span onClick={() => setMinus(t, i)} className="tabledetail_act_btn" style={{ color: "#ff6600", borderColor: "#ff6600" }}><MinusOutlined /></span>
                            <span onClick={() => setPlus(t, i)} className="tabledetail_act_btn" style={{ color: "#ff6600", borderColor: "#ff6600" }}><PlusOutlined /></span>
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
