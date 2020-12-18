import React, { useState } from 'react';
import './index.css';
import Types from './type/Types';
import Products from './product/Products';
import { Button } from 'antd';
import Warehouse from './warehouse/Warehouse';
const ProductsAdmin = ({ myuser, setUser }) => {
    const [select, setSelect] = useState(1)
    return (
        <div className="products-admin">
            <Button></Button>
            <div className="products-admin-select">
                <div onClick={() => setSelect(1)} className="products-admin-select-1">
                    <p className={select === 1 ? "products-admin-selected-p" : ""}>Sản phẩm</p>
                    <div className={select === 1 ? "products-admin-selected" : ""}></div>
                </div>
                <div onClick={() => setSelect(2)} className="products-admin-select-1">
                    <p className={select === 2 ? "products-admin-selected-p" : ""}>Nhóm sản phẩm</p>
                    <div className={select === 2 ? "products-admin-selected" : ""}></div>
                </div>
                <div onClick={() => setSelect(3)} className="products-admin-select-1">
                    <p className={select === 3 ? "products-admin-selected-p" : ""}>Kho hàng</p>
                    <div className={select === 3 ? "products-admin-selected" : ""}></div>
                </div>

            </div>
            {select === 1 ? <Products key={1} /> : select === 2 ? <Types key={2} /> : <Warehouse key={3} />}
        </div>
    )
}
export default ProductsAdmin;