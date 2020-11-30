import React, { useState } from 'react';
import { Modal } from 'antd';
import Address from './Address';
const CheckoutAddress = ({ address, setAddress, addressList, setAddressList }) => {
    const [changeAddress, setChangAddress] = useState(false)
    const onCancel = () => setChangAddress(false)
    return (
        <div className="checkout_address">
            <div className="checkout_location_text">
                <svg width="20px" height="20px" fill="#ff3300" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                    <g><path d="M500,10c-219.3,0-397,164.5-397,367.5C103,683.7,433.8,990,500,990c66.2,0,397-306.3,397-612.5C897,174.5,719.3,10,500,10z M500,598c-109.6,0-198.5-87.8-198.5-196c0-108.2,88.9-196,198.5-196c109.6,0,198.5,87.8,198.5,196C698.5,510.2,609.6,598,500,598z" /></g>
                </svg>
             Địa chỉ nhận hàng</div>
            <div className="checkout_address_add">
                <div className="checkout_address_address">
                    {(address) ? <div>{address.fullname} - {address.phone}</div> : <div>Vui Lòng thay đổi địa chỉ nhận hàng</div>}
                    <p>{address ? address.address : ""}</p>
                </div>
                <div className="checkout_address_change">
                    {(address && address.default) ? <div>Mặc định</div> : <div></div>}
                    <button onClick={() => setChangAddress(true)}>Chỉn sửa</button>
                </div>
            </div>
            <Modal
                title="Vui lòng chọn địa chỉ của bạn"
                visible={changeAddress}
                onCancel={onCancel}
                footer={null}
                width="800px"
            >
                <Address address={address} setChangAddress={setChangAddress} setAddress={setAddress} addressList={addressList} />
            </Modal>
        </div >
    )
}
export default CheckoutAddress;