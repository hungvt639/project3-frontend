import React, { useState, useEffect } from 'react';
import getFactory from '../../request/index';
import { Empty, Popconfirm, Pagination, Modal, Drawer } from 'antd';
import { PlusCircleOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Notification from '../../general/Notification';
import errorNotification from '../../general/errorNotification';
import FormType from './FormType';
import FormTypeEdit from './FormTypeEdit';
const Types = () => {
    const API = getFactory('product');
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [types, setType] = useState({})
    var [values, setValues] = useState({})
    useEffect(() => {
        const getTypes = async () => {
            try {
                const res = await API.getType(`?page=${page}&limit=${limit}`)
                setType(res)
            } catch {
                setType([])
            }
        }
        getTypes()
    }, [page, limit])
    const deleteType = async (id) => {
        try {
            const res = await API.deleteType(id, `?page=${page}&limit=${limit}`)
            setType(res)
            Notification("Xóa thành công, hiện tại các sản phẩm thuộc loại này không còn được bán!")
        } catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const onShowSizeChange = (current, pageSize) => {
        setLimit(pageSize)
    }
    const onChange = (page, limit) => {
        setPage(page)
        setLimit(limit)
    }
    const tableTypes = types.data ? types.data.map(t => <>
        <tr key={t.id}>
            <td>{t.type}</td>
            <td className="products-admin-table-td">
                <p onClick={() => { setShowEdit(true); setValues(t) }} style={{ color: "#ff6600", borderColor: "#ff6600" }}><EditOutlined /></p>
                <Popconfirm
                    placement="topRight"
                    title="Tất cả các sản phẩm thuộc loại này đều sẽ dừng bán! Bạn có muốn tiếp tục xóa?"
                    onConfirm={() => deleteType(t.id)}
                    okText="Có"
                    cancelText="Không"
                ><p style={{ color: "#808080", borderColor: "#808080" }}><DeleteOutlined /></p></Popconfirm>
            </td>
        </tr>
    </>) : []
    const pagination = Object.keys(types).length ? <Pagination className="pagination"
        showSizeChanger
        pageSize={limit}
        pageSizeOptions={[5, 10, 20, 50]}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={types.page}
        current={page}
        onChange={onChange}
        total={types.total}
    /> : <Pagination className="pagination" current={1} showSizeChanger disabled total={1} />
    return (
        <div className="products-admin-action">

            <div className="products-admin-actions">
                <button onClick={() => setShowCreate(true)} className="products-admin-actions-add"><PlusCircleOutlined /> Thêm mới</button>
                <button><SearchOutlined /></button>
                <input placeholder="Loại sản phẩm" />
            </div>
            <table className="products-admin-table">
                <thead>
                    <tr>
                        <th>Loại quần áo</th>
                        <th className="products-admin-table-action">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {tableTypes}
                </tbody>

            </table>
            {tableTypes.length === 0 ? <Empty /> : ""}
            {pagination}
            <Drawer
                title="Tạo nhóm sản phẩm mới"
                placement="right"
                width={400}
                closable={true}
                onClose={() => setShowCreate(false)}
                visible={showCreate}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <FormType setShowCreate={setShowCreate} setType={setType} page={page} limit={limit} />
            </Drawer>
            <Modal
                title="Chỉnh sửa nhóm sản phẩm"
                visible={showEdit}
                onCancel={() => setShowEdit(false)}
                footer={null}
                width="400px"
            >
                <FormTypeEdit types={types} setShowEdit={setShowEdit} setType={setType} values={values} />
            </Modal>
        </div>
    )
}
export default Types;