import React, { useState, useEffect } from 'react';
import getFactory from '../../../request/index';
import { Empty, Popconfirm, Pagination, Drawer, Image } from 'antd';
import { PlusCircleOutlined, SearchOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Notification from '../../../general/Notification';
import errorNotification from '../../../general/errorNotification';
import urls from '../../../const';
import FormCreateProduct from './FormCreateProduct';
import { useHistory } from 'react-router-dom';
import { Fragment } from 'react';



const Products = () => {
    const API = getFactory('product');
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [showCreate, setShowCreate] = useState(false)
    const [products, setProducts] = useState({})
    const [search, setSearch] = useState("")
    var [searchInput, setSearchInput] = useState("");
    var [searchSelect, setSearchSelect] = useState("0");
    const [types, setTypes] = useState([])
    const [number, setNumber] = useState(0)
    const history = useHistory()

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
        const getProduct = async () => {
            try {
                const res = await API.getProducts(`?page=${page}&limit=${limit}${search}`)
                setProducts(res)
            } catch {
                setProducts([])
            }
        }
        getProduct()
    }, [page, limit, search, number, API])


    const deleteProduct = async (id) => {
        try {
            await API.deleteProducts(id)
            setNumber(number + 1)
            Notification("Xóa thành công, hiện tại các sản phẩm này không còn được bán!")
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




    const pagination = Object.keys(products).length ? <Pagination className="pagination"
        showSizeChanger
        pageSize={limit}
        pageSizeOptions={[5, 10, 20, 50]}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={products.page}
        current={page}
        onChange={onChange}
        total={products.total}
    /> : <Pagination className="pagination" current={page} onChange={onChange} showSizeChanger disabled total={1} />


    const searchProduct = () => {
        var searchs = "";
        if (searchInput) { searchs = searchs + `&search=${searchInput}` };
        if (searchSelect !== "0") { searchs = searchs + `&type=${searchSelect}` };
        setSearch(searchs)
    }


    const onChangeInputSearch = (val) => {
        setSearchInput(val);
    }


    const onChangeTypeSearch = (val) => {
        setSearchSelect(val);
    }


    return (
        <div className="products-admin-action">
            <div className="products-admin-actions">
                <button onClick={() => setShowCreate(true)} className="products-admin-actions-add"><PlusCircleOutlined /> Thêm mới</button>

                <button onClick={searchProduct} ><SearchOutlined /></button>
                <input onChange={(val) => onChangeInputSearch(val.target.value)} name="search" placeholder="Tìm kiếm sản phẩm" />
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
                                <th className="textAlignCenter">Ảnh</th>
                                <th className="textAlignCenter">Nhóm</th>
                                <th className="textAlignCenter">Đã bán</th>
                                <th className="textAlignCenter">Giá</th>
                                <th className="products-admin-table-action">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableProducts history={history} products={products} deleteProduct={deleteProduct} />
                        </tbody>
                    </table>
                    {products.data ? products.data.length ? "" : <Empty /> : <Empty />}
                    <div className="pagination-div">
                        {pagination}
                    </div>
                    <div style={{ height: "250px" }}></div>
                </div>
            </div>
            <Drawer
                title="Tạo nhóm sản phẩm mới"
                placement="right"
                width={600}
                closable={true}
                onClose={() => setShowCreate(false)}
                visible={showCreate}
            >
                <FormCreateProduct val={{}} types={types} setShowCreate={setShowCreate} />
            </Drawer>
        </div>
    )
}
export default Products;



const TableProducts = React.memo(({ history, products, deleteProduct }) => {
    return (
        <Fragment>
            {products.data ? products.data.map((t) => {
                return (
                    <tr key={t.id}>
                        <td>{t.name}</td>
                        <td className="textAlignCenter"><Image width={50} src={`${urls}${t.avatar}`} /></td>
                        <td className="textAlignCenter">{t.type.type}</td>
                        <td className="textAlignCenter">{t.sold}</td>
                        <td className="textAlignCenter">{(t.from_saleprice !== t.to_saleprice) ?
                            <p id="price">
                                {t.from_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i> -
                         {t.to_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
                            </p> : <p id="price">
                                {t.from_saleprice.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
                            </p>}</td>
                        <td className="products-admin-table-td">
                            <p onClick={() => history.push(`/home/detail/${t.id}`)} style={{ color: "#ff6600", borderColor: "#ff6600" }}><EyeOutlined /></p>
                            <Popconfirm
                                placement="topRight"
                                title="Xóa sản phẩm?"
                                onConfirm={() => deleteProduct(t.id)}
                                okText="Có"
                                cancelText="Không"
                            ><p style={{ color: "#808080", borderColor: "#808080" }}><DeleteOutlined /></p></Popconfirm>
                        </td>
                    </tr>
                )
            })
                :
                <Fragment></Fragment>}
        </Fragment>
    )
})