import React, { useState, useEffect } from 'react';
import getFactory from '../../../request/index';
import { Empty, Popconfirm, Pagination, Drawer, Modal } from 'antd';
import { PlusCircleOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Notification from '../../../general/Notification';
import errorNotification from '../../../general/errorNotification';
import WarehouseFormEdit from './WarehouseFormEdit';
import WarehouseForm from './WarehouseForm';
const Warehouse = () => {
    const API = getFactory('product');
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [showCreate, setShowCreate] = useState(false)
    const [details, setDetails] = useState({})
    const [search, setSearch] = useState("")
    var [searchInput, setSearchInput] = useState("");
    var [searchSelect, setSearchSelect] = useState("0");
    const [products, setProducts] = useState([])
    const [types, setTypes] = useState([])
    const [number, setNumber] = useState(0)
    const [showEdit, setShowEdit] = useState(false)
    var [values, setValues] = useState({})


    useEffect(() => {
        const getTypes = async () => {
            const API = getFactory('product');
            try {
                const res = await API.getType("")
                setTypes(res.data)
            } catch {
                setTypes([])
            }
        }
        getTypes()
    }, [])


    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await API.getDetail(`?page=${page}&limit=${limit}${search}`)
                setDetails(res)
            } catch {
                setDetails([])
            }
        }
        getDetails()
    }, [page, limit, search, number, API])


    const deleteDetail = async (id) => {
        try {
            await API.deleteDetail(id)
            setNumber(number + 1)
            Notification("Xóa thành công!")
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


    const tableProducts = details.data ? details.data.map(t => <>
        <tr key={t.id}>
            <td>{t.product.name}</td>
            {/* <td style={{ textAlign: "center" }}><Image width={50} src={`${urls}${t.product.avatar}`} /></td> */}
            <td>{t.product.type.type}</td>
            <td>{t.size}</td>
            <td>{t.color}</td>
            <td><p id="price">
                {t.saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
            </p></td>
            <td>{t.amount}</td>
            <td className="products-admin-table-td">
                <p onClick={() => { setShowEdit(true); setValues(t) }} style={{ color: "#ff6600", borderColor: "#ff6600" }}><EditOutlined /></p>
                <Popconfirm
                    placement="topRight"
                    title="Xóa sản phẩm?"
                    onConfirm={() => deleteDetail(t.id)}
                    okText="Có"
                    cancelText="Không"
                ><p style={{ color: "#808080", borderColor: "#808080" }}><DeleteOutlined /></p></Popconfirm>
            </td>
        </tr>
    </>) : []


    const pagination = Object.keys(details).length ? <Pagination className="pagination"
        showSizeChanger
        pageSize={limit}
        pageSizeOptions={[5, 10, 20, 50]}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={details.page}
        current={page}
        onChange={onChange}
        total={details.total}
    /> : <Pagination className="pagination" current={page} onChange={onChange} showSizeChanger disabled total={1} />


    console.log(searchSelect, searchInput)
    const searchProduct = () => {
        var searchs = "";
        if (searchSelect !== "0") { searchs = searchs + `&type=${searchSelect}` };
        if (searchInput) { searchs = searchs + `&product=${searchInput}` };
        console.log(searchs)
        setSearch(searchs)
    }


    const getProduct = async (sear) => {
        try {
            const res = await API.getProducts(`${sear}`)
            setProducts(res.data)
        } catch {
            setProducts([])
        }
    }


    const onChangeInputSearch = (val) => {
        setSearchInput(val);
    }


    const onChangeTypeSearch = (val) => {
        setSearchSelect(val);
        setSearchInput("")
        if (val === "0") setProducts([])
        else getProduct(`?type=${val}`)

    }


    console.log(details)
    return (
        <div className="products-admin-action">
            <div className="products-admin-actions">
                <button onClick={() => types.length ? setShowCreate(true) : errorNotification("Không có nhóm sản phẩm nào, không thế thêm!")} className="products-admin-actions-add"><PlusCircleOutlined /> Thêm mới</button>

                <button onClick={searchProduct} ><SearchOutlined /></button>
                {/* <input onChange={(val) => onChangeInputSearch(val.target.value)} name="search" placeholder="Tìm kiếm sản phẩm" /> */}
                <select onChange={(val) => onChangeInputSearch(val.target.value)}>
                    <option value={0}>Tất cả</option>
                    {products.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <select onChange={(val) => onChangeTypeSearch(val.target.value)}>
                    <option value={0}>Tất cả</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.type}</option>)}
                </select>
            </div>
            <div className="products-admin-1">
                <div className="products-admin-2">
                    <table className="products-admin-table">
                        <thead className="products-admin-table-1">
                            <tr>
                                <th>Tên mặt hàng</th>
                                {/* <th>Ảnh</th> */}
                                <th>Nhóm</th>
                                <th>Size</th>
                                <th>Màu sắc</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th className="products-admin-table-action">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableProducts}
                        </tbody>
                    </table>
                    {tableProducts.length === 0 ? <Empty /> : ""}
                    <div className="pagination-div">
                        {pagination}
                    </div>
                    <div style={{ height: "250px" }}></div>
                </div>
            </div>
            <Modal
                title="Chỉnh sửa nhóm sản phẩm"
                visible={showEdit}
                onCancel={() => setShowEdit(false)}
                footer={null}
                width="400px"
            >
                <WarehouseFormEdit details={details} setShowEdit={setShowEdit} setDetails={setDetails} values={values} />
            </Modal>
            <Drawer
                title="Tạo nhóm sản phẩm mới"
                placement="right"
                width={600}
                closable={true}
                onClose={() => setShowCreate(false)}
                visible={showCreate}
            >
                <WarehouseForm setShowCreate={setShowCreate} types={types} number={number} setNumber={setNumber} />
            </Drawer>
        </div>
    )
}
export default Warehouse;