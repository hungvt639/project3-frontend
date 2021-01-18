import React, { useState, useEffect, Fragment } from 'react';
import './index.css';
import { PlusCircleOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Pagination, Switch, Empty } from 'antd'
import getFactory from '../../request';
import PromotionDetail from './PromotionDetail'
import FormPromotion from './FormPromotion'
import Catch from '../../general/Catch';
const Promotion = () => {

    const [select, setSelect] = useState(1)
    const [show, setShow] = useState(false)
    const [promotions, setPromotions] = useState({})
    const [pages, setPages] = useState({ page: 1, limit: 5 })
    const [promotionShow, setPromotionShow] = useState(-1)
    const [values, setValues] = useState({})

    useEffect(() => {
        async function getPromotion() {
            const API = getFactory('promotion')
            try {
                const res = await API.getPromotions(`?page=${pages.page}&limit=${pages.limit}`)
                setPromotionShow(-1)
                setPromotions(res)
            } catch (e) { }
        }
        getPromotion()
    }, [pages])
    console.log('promotions', promotions)
    async function deletePromotion(t, i) {
        const API = getFactory('promotion')
        try {
            const data = { 'on_delete': !t.on_delete }
            await API.deletePromotions(t.id, data)
            setPromotions({
                ...promotions, data: promotions.data.slice(0, i)
                    .concat({ ...promotions.data[i], on_delete: !t.on_delete })
                    .concat(promotions.data.slice(i + 1))
            })
        } catch (e) {
            Catch(e)
        }
    }

    function onChangeInputSearch(val) {

    }
    function onChangeTypeSearch(val) {

    }
    function searchProduct() {

    }
    const onShowSizeChange = (current, pageSize) => {
        setPages({ ...pages, limit: pageSize })
    }

    const onChange = (page, limit) => {
        setPages({ page: page, limit: limit })

    }

    const pagination = Object.keys(promotions).length ? <Pagination className="pagination"
        showSizeChanger
        pageSize={pages.limit}
        pageSizeOptions={[5, 10, 20, 50]}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={promotions.page}
        current={pages.page}
        onChange={onChange}
        total={promotions.total}
    /> : <Pagination className="pagination" current={pages.page} onChange={onChange} showSizeChanger disabled total={1} />
    return (
        <div className="products-admin promotion">
            <div className="products-admin-select">
                <div onClick={() => { setSelect(1) }} className="products-admin-select-1">
                    <p className={select === 1 ? "products-admin-selected-p" : ""}>Tất cả</p>
                    <div className={select === 1 ? "products-admin-selected" : ""}></div>
                </div>
                <div onClick={() => { setSelect(2) }} className="products-admin-select-1">
                    <p className={select === 2 ? "products-admin-selected-p" : ""}>Đang sử dụng</p>
                    <div className={select === 2 ? "products-admin-selected" : ""}></div>
                </div>
                <div onClick={() => { setSelect(3) }} className="products-admin-select-1">
                    <p className={select === 3 ? "products-admin-selected-p" : ""}>Dừng sử dụng</p>
                    <div className={select === 3 ? "products-admin-selected" : ""}></div>
                </div>
            </div>
            <div className="products-admin-action" style={{ height: "100%" }}>
                <div className="products-admin-actions">
                    <button onClick={() => {
                        setValues({ index: -1, name: "", time: "", type: 1, value: "", max_value: "", comment: "" });
                        setShow(true)
                    }} className="products-admin-actions-add"><PlusCircleOutlined /> Thêm mới</button>

                    <button onClick={searchProduct} ><SearchOutlined /></button>
                    <input onChange={(val) => onChangeInputSearch(val.target.value)} name="search" placeholder="Tìm kiếm sản phẩm" />
                    <select onChange={(val) => onChangeTypeSearch(val.target.value)}>
                        <option value={0}>Tất cả</option>
                        {/* {types.map(t => <option key={t.id} value={t.id}>{t.type}</option>)} */}
                    </select>
                </div>
                <div className="products-admin-1 flex_row promotion_detail">
                    <div className="products-admin-2" style={{ width: "60%" }}>
                        <table className="products-admin-table"  >
                            <thead className="products-admin-table-1">
                                <tr>
                                    <th>Nội dung</th>
                                    <th className="textAlignCenter">Từ</th>
                                    <th className="textAlignCenter">Đến</th>
                                    <th className="textAlignCenter">Loại</th>
                                    <th className="textAlignCenter">Giá trị</th>
                                    <th className="textAlignCenter">Tối đa</th>
                                    <th className="textAlignCenter">Ghi chú</th>
                                    <th className="textAlignCenter">Sửa</th>
                                    <th className="textAlignCenter">Sử dụng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TablePromotions promotions={promotions}
                                    deletePromotion={deletePromotion}
                                    setPromotionShow={setPromotionShow}
                                    promotionShow={promotionShow}
                                    setValues={setValues}
                                    setShow={setShow} />

                                {/* <TableProducts history={history} products={products} deleteProduct={deleteProduct} /> */}
                            </tbody>
                        </table>

                        {promotions.data ? promotions.data.length ? "" : <Empty /> : <Empty />}
                        <div className="pagination-div">
                            {pagination}
                        </div>
                        <div style={{ height: "250px" }}></div>

                    </div>
                    <PromotionDetail promotions={promotions} promotionShow={promotionShow} setPromotions={setPromotionShow} />
                </div>
                <FormPromotion show={show} setShow={setShow} promotions={promotions} setPromotions={setPromotions} values={values} />
            </div>
        </div>
    )
}
export default Promotion;
const TablePromotions = React.memo(({ promotions, deletePromotion, setPromotionShow, promotionShow, setValues, setShow }) => {
    const [loading, setLoading] = useState(-1)
    async function change(t, i) {
        setLoading(i)
        console.log(11)
        await deletePromotion(t, i)
        setLoading(-1)
        console.log(22)
    }
    function setEdit(t, i) {
        setValues({ ...t, index: i })
        setShow(true)
    }
    return (
        <Fragment>
            {promotions.data ? promotions.data.map((t, i) => {
                return (
                    <tr className={promotionShow === i ? "promotion_tr promotion_click" : "promotion_tr"} key={t.id} onClick={() => setPromotionShow(i)}>
                        <td>{t.name}</td>
                        <td className="textAlignCenter">{t.time_from}</td>
                        <td className="textAlignCenter">{t.time_to}</td>
                        <td className="textAlignCenter">{t.type ? "VND" : "phần trăm"}</td>

                        <td className="textAlignCenter">{t.value}</td>
                        <td className="textAlignCenter">{t.max_value ? t.max_value : ""}</td>
                        <td className="textAlignCenter">{t.comment}</td>
                        <td className="textAlignCenter promotion_edits">
                            <p onClick={() => { setEdit(t, i) }} ><EditOutlined /></p>
                        </td>
                        <td className="textAlignCenter"><Switch defaultChecked={!t.on_delete} loading={loading === i ? true : false} checked={!t.on_delete} onClick={() => change(t, i)} /></td>
                    </tr>
                )
            })
                :
                <Fragment></Fragment>}
        </Fragment>
    )
})