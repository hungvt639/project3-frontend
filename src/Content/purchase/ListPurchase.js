import React, { useState } from 'react';


const ListPurchase = ({ getPurchases }) => {

    const [purStatus, setPurStatus] = useState(0)



    const setPurchase = (val) => {
        var data = "";
        if (val) data = `?status=${val}`
        getPurchases(data)
        setPurStatus(val)
    }
    return (
        <div className="purchase_list">
            <p className={(purStatus === 0) ? "purchase_list_chose" : ""} onClick={() => setPurchase(0)}>Tất cả</p>
            <p className={(purStatus === 1) ? "purchase_list_chose" : ""} onClick={() => setPurchase(1)} >Chờ xác nhận</p>
            <p className={(purStatus === 2) ? "purchase_list_chose" : ""} onClick={() => setPurchase(2)}>Chờ lấy hàng</p>
            <p className={(purStatus === 3) ? "purchase_list_chose" : ""} onClick={() => setPurchase(3)}>Đang giao</p>
            <p className={(purStatus === 4) ? "purchase_list_chose" : ""} onClick={() => setPurchase(4)}>Đã nhận</p>
            <p className={(purStatus === 5) ? "purchase_list_chose" : ""} onClick={() => setPurchase(5)}>Đã hủy</p>
        </div>
    )
}
export default ListPurchase;