// import React from 'react'
import errorNotification from './errorNotification'
function Catch(e) {
    if (e.request.status === 0) {
        errorNotification("Lỗi mạng!");
    } else if (e.response.data.message) {
        e.response.data.message.map(x => errorNotification(x))
    } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
}
export default Catch