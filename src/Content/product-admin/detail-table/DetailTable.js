import React, { useState } from 'react'
import urls from '../../../const'
import { Image } from 'antd';
import Warehouse from './Warehouse'
import Describes from './Describes'
import Descriptions from './Descriptions'
import ListImg from '../detail/ListImg'
import FormEditProduct from '../forms/FormEditProduct'
const DetailTable = ({ match, product, setProduct }) => {

    const [viewTable, setViewTable] = useState(4)
    const [showEdit, setShowEdit] = useState(false)

    const price = product.from_saleprice === product.to_saleprice ? `${product.from_saleprice.toLocaleString('vi-VN')}₫` : `${product.from_saleprice.toLocaleString('vi-VN')}₫ - ${product.to_saleprice.toLocaleString('vi-VN')}₫`

    return (
        <div className="tabledetails">
            <div className="tabledetails_left">
                <h2 className="tabledetails_name">{product.name}</h2>
                <div className="tabledetails_avatar"><Image src={`${urls}${product.avatar}`} alt="Avatar" width="200px" /></div>
                <div className="tabledetails_p">
                    <p className="tabledetails_p" >Nhóm sản phẩm: <span>{product.type.type}</span> </p>
                    <p className="tabledetails_p">Giá bán: <span>{price}</span></p>
                    <p className="tabledetails_p">Đã bán: <span>{product.sold} sản phẩm</span></p>
                    <div className="tabledetails_button_edit"><button onClick={() => setShowEdit(true)}>Chỉnh sửa</button></div>
                </div>
            </div>
            <div className="tabledetails_right">
                <div className="products-admin-select">
                    <div onClick={() => setViewTable(1)} className="products-admin-select-1">
                        <p className={viewTable === 1 ? "products-admin-selected-p" : ""}>Ảnh</p>
                        <div className={viewTable === 1 ? "products-admin-selected" : ""}></div>
                    </div>
                    <div onClick={() => setViewTable(2)} className="products-admin-select-1">
                        <p className={viewTable === 2 ? "products-admin-selected-p" : ""}>Mô tả</p>
                        <div className={viewTable === 2 ? "products-admin-selected" : ""}></div>
                    </div>
                    <div onClick={() => setViewTable(3)} className="products-admin-select-1">
                        <p className={viewTable === 3 ? "products-admin-selected-p" : ""}>Chi tiết</p>
                        <div className={viewTable === 3 ? "products-admin-selected" : ""}></div>
                    </div>
                    <div onClick={() => setViewTable(4)} className="products-admin-select-1">
                        <p className={viewTable === 4 ? "products-admin-selected-p" : ""}>Kho</p>
                        <div className={viewTable === 4 ? "products-admin-selected" : ""}></div>
                    </div>
                </div>
                <div className="tabledetails_rights">
                    {viewTable === 1 ? <ListImg product={product} setProduct={setProduct} viewTable={true} /> :
                        viewTable === 2 ? < Describes product={product} setProduct={setProduct} /> :
                            viewTable === 3 ? <Descriptions product={product} setProduct={setProduct} /> :
                                <Warehouse product={product} setProduct={setProduct} />}
                </div>
            </div>
            <FormEditProduct showEdit={showEdit} setShowEdit={setShowEdit} product={product} setProduct={setProduct} />
        </div>
    )
}
export default DetailTable
