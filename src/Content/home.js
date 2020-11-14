import React, {useState, useEffect} from 'react';
import errorNotification from '../general/errorNotification';
import './index.css';
import 'antd/dist/antd.css';
import getFactory from '../request/index';
import IndexProduct from './IndexProduct';


const Homepage = ({myuser, setUser}) => {
    const [products, setProduct] = useState([]);
    const API = getFactory('product');
    const getproduct = async () =>{
        try{
            const res = await API.getProducts();
            setProduct(res.data)
        }
        catch(e){
            errorNotification("Lỗi mạng")
        }
    }

    useEffect(()=>{
        getproduct()
    },[])
    console.log(products);

    
    const items=[]
    for(const i of products){
        items.push(<IndexProduct key={i.id} product={i}/>);
    }
    return(
        <span className="items">{items}</span>
    )
}
export default Homepage;