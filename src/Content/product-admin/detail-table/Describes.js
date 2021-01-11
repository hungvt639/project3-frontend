import React, { useState, Fragment } from 'react'
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Empty } from 'antd'
import FormDescribe from '../forms/FormDescribe'
import getFactory from '../../../request/index'
import Catch from '../../../general/Catch'
import Notification from '../../../general/Notification';
const Describes = ({ product, setProduct }) => {
    const [show, setShow] = useState(false)
    const [values, setValues] = useState({})
    const [index, setIndex] = useState(-1)
    async function deletes(id, i) {
        const API = getFactory('product')
        try {
            await API.deleteDescribes(id)
            setProduct({ ...product, describe: product.describe.slice(0, i).concat(product.describe.slice(i + 1)) })
            Notification("Xóa mô tả thành công!")
        } catch (e) {
            Catch(e)
        }
    }
    return (
        <Fragment>
            <div className="tabledetails_des">
                <div className="tabledetails_add">
                    <button onClick={() => { setValues({ context: "" }); setIndex(-1); setShow(true) }} ><PlusCircleOutlined /> Thêm mới</button>
                </div>
                <div className="products-admin-1">
                    <div className="products-admin-2">
                        <table className="products-admin-table">
                            <thead className="products-admin-table-1">
                                <tr>
                                    <th>Mô tả sản phẩm</th>
                                    <th className="products-admin-table-action">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableDescribe describe={product.describe} setValues={setValues} setIndex={setIndex} setShow={setShow} deletes={deletes} />
                            </tbody>
                        </table>
                        {product.describe.length ? <Fragment /> : <Empty />}
                    </div>
                </div>
            </div>
            <FormDescribe show={show} setShow={setShow} product={product} setProduct={setProduct} index={index} values={values} />
        </Fragment>

    )
}
export default Describes
const TableDescribe = React.memo(({ describe, setValues, setIndex, setShow, deletes }) => {

    function edit(des, i) {
        // console.log(des, i)
        setValues(des)
        setIndex(i)
        setShow(true)
    }
    return (
        <Fragment>
            {describe.length ? describe.map((t, i) => {
                return (
                    <tr key={t.id}>
                        <td>{t.context}</td>
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