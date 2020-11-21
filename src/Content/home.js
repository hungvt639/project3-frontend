import React, {useState, useEffect} from 'react';
import errorNotification from '../general/errorNotification';
import './index.css';
import 'antd/dist/antd.css';
import getFactory from '../request/index';
import IndexProduct from './product/IndexProduct';
import {Empty} from 'antd'

const Homepage = ({myuser, setUser}) => {
    const [products, setProduct] = useState([]);
    const API = getFactory('product');
    
    useEffect(()=>{
        const getproduct = async () =>{
            try{
                const res = await API.getProducts();
                setProduct(res.data)
            }
            catch(e){
                errorNotification("Lỗi mạng")
            }
        }
        getproduct()
    },[])

    
    const items=[]
    for(const i of products){
        items.push(<IndexProduct key={i.id} product={i}/>);
    }
    if(items.length){
        return(
            <span className="items">{items}</span>
        )
    }
    else{
        return(
            <Empty />
        )
    }
    
}
export default Homepage;