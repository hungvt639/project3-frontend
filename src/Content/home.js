import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import IndexProduct from './IndexProduct';


const Homepage = () => {
    const product = {
        name:"CHẮC VÌ MÌNH CHƯA TỐT (Ai Đợi Mình Được Mãi P2) | THANH HƯNG | OFFICIAL MV",
        img:"/media/avatar.jpg",
        price:"100000",
        sold:21,
        id:"ABCDEF"
    }
    const items=[]
    for(var i = 0; i<30; i++){
        items.push(<IndexProduct key={i} product={product}/>);
    }
    return(
        <span className="items">{items}</span>
    )
}
export default Homepage;