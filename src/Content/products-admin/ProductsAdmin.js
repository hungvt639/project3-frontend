import React, { useState } from 'react';
import './index.css';
import Types from './Types';
import Products from './Products';
const ProductsAdmin = ({ myuser, setUser }) => {
    const [select, setSelect] = useState(1)
    return (
        <div className="products-admin">
            <div className="products-admin-select">
                <div onClick={() => setSelect(1)} className="products-admin-select-1">
                    <p className={select === 1 ? "products-admin-selected-p" : ""}>Nhóm sản phẩm</p>
                    <div className={select === 1 ? "products-admin-selected" : ""}></div>
                </div>
                <div onClick={() => setSelect(2)} className="products-admin-select-1">
                    <p className={select === 2 ? "products-admin-selected-p" : ""}>Sản phẩm</p>
                    <div className={select === 2 ? "products-admin-selected" : ""}></div>
                </div>
            </div>
            {select === 1 ? <Types key={1} /> : <Products key={2} />}
        </div>
    )
}
export default ProductsAdmin;