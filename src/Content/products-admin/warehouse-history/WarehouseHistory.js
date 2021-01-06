import React, { useState, useEffect } from 'react';
import getFactory from '../../../request/index';
import { Empty, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import Notification from '../../../general/Notification';
// import errorNotification from '../../../general/errorNotification';
// import FormAmount from './FormAmount';
import { Fragment } from 'react';
// import WarehouseFormEdit from './WarehouseFormEdit';
// import WarehouseForm from './WarehouseForm';
// import FormAmount from './FormAmount'
const WarehouseHistory = () => {
    const API = getFactory('product');
    // const [limit, setLimit] = useState(5)
    const [page, setPage] = useState({
        page: 1,
        limit: 5
    })
    // const [showCreate, setShowCreate] = useState(false)
    const [amount, setAmount] = useState({})
    const [search, setSearch] = useState("")
    var [searchInput, setSearchInput] = useState("");
    var [searchSelect, setSearchSelect] = useState("0");
    const [products, setProducts] = useState([])
    const [types, setTypes] = useState([])
    // const [number, setNumber] = useState(0)
    // const [showEdit, setShowEdit] = useState(false)
    // const [valueAsAmount, setValueAsAmount] = useState({ "is_plus": true })
    // const [showAsAmountm, setShowAsAmount] = useState(false)
    // var [values, setValues] = useState({})


    useEffect(() => {
        const getTypes = async () => {
            const API = getFactory('product');
            try {
                const res = await API.getType("")
                // console.log(res)
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
                const res = await API.getAmount(`?page=${page.page}&limit=${page.limit}${search}`)
                setAmount(res)
                console.log("amount", res)
            } catch {
                setAmount([])
            }
        }
        getDetails()
    }, [page, search, API])


    const onShowSizeChange = (current, pageSize) => {
        setPage({ ...page, limit: pageSize })
    }


    const onChange = (page, limit) => {
        setPage({
            page: page,
            limit: limit
        })
    }


    const pagination = Object.keys(amount).length ? <Pagination className="pagination"
        showSizeChanger
        pageSize={page.limit}
        pageSizeOptions={[5, 10, 20, 50]}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={amount.page}
        current={page.page}
        onChange={onChange}
        total={amount.total}
    /> : <Pagination className="pagination" current={page.page} onChange={onChange} showSizeChanger disabled total={1} />


    const searchProduct = () => {
        var searchs = "";
        if (searchSelect !== "0") { searchs = searchs + `&type=${searchSelect}` };
        if (searchInput) { searchs = searchs + `&product=${searchInput}` };
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

    // const createAmounts = (val) => {
    //     setValueAsAmount({ "is_plus": val }); setShowCreate(true)
    // }

    return (
        <div className="products-admin-action">
            <div className="products-admin-actions">
                {/* <button onClick={() => types.length ? createAmounts(true) : errorNotification("Không có nhóm sản phẩm nào, không thế thao tác!")} className="products-admin-actions-add"><PlusCircleOutlined /> Thêm</button> */}
                {/* <button onClick={() => types.length ? createAmounts(false) : errorNotification("Không có nhóm sản phẩm nào, không thế thao tác!")} className="products-admin-actions-add"><MinusCircleOutlined /> Bớt</button> */}
                <button onClick={searchProduct} ><SearchOutlined /></button>
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
                                <th className="textAlignCenter">Thao tác</th>
                                <th className="textAlignCenter">Số lượng</th>
                                <th className="textAlignCenter">Kho</th>
                                <th>Tên mặt hàng</th>
                                <th className="textAlignCenter">Nhóm</th>
                                <th className="textAlignCenter">Size</th>
                                <th className="textAlignCenter">Màu sắc</th>
                                <th className="textAlignCenter">Giá</th>
                                <th className="textAlignCenter">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableWarehouses amount={amount} />
                        </tbody>
                    </table>
                    {amount.data ? amount.data.length ? "" : <Empty /> : <Empty />}
                    <div className="pagination-div">
                        {pagination}
                    </div>
                    <div style={{ height: "250px" }}></div>
                </div>
            </div>
            {/* <Drawer
                title={valueAsAmount.is_plus ? "Thêm sản phẩm vào kho!" : "Bớt sản phẩm trong kho!"}
                placement="right"
                width={600}
                closable={true}
                onClose={() => setShowCreate(false)}
                visible={showCreate}
            >
                <FormAmount types={types} amount={amount} setShowAsAmount={setShowAsAmount} setAmount={setAmount} valueAsAmount={valueAsAmount} />
            </Drawer> */}
        </div>
    )
}
export default WarehouseHistory;

const TableWarehouses = React.memo(({ amount }) => {
    return (
        <Fragment>
            {amount.data ? amount.data.map(t => {
                return (
                    <tr key={t.id}>
                        <td className="textAlignCenter" ><p className={t.is_plus ? "amount_plus" : "amount_minus"}>{t.is_plus ? "Thêm" : "Bớt"}</p></td>
                        <td className="textAlignCenter">{t.amount}</td>
                        <td className="textAlignCenter">{t.detail.amount}</td>
                        <td>{t.detail.product.name}</td>
                        {/* <td style={{ textAlign: "center" }}><Image width={50} src={`${urls}${t.product.avatar}`} /></td> */}
                        <td className="textAlignCenter">{t.detail.product.type.type}</td>
                        <td className="textAlignCenter">{t.detail.size}</td>
                        <td className="textAlignCenter">{t.detail.color}</td>
                        <td className="textAlignCenter"><p id="price">
                            {t.price.toLocaleString('vi-VN')}<i style={{ 'textDecorationLine': 'underline', 'verticalAlign': '5px' }}>đ</i>
                        </p></td>
                        <td className="textAlignCenter">{t.note}</td>
                    </tr>
                )
            }
            ) : <Fragment></Fragment>}
        </Fragment>
    )
})