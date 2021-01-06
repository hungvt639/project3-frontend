import React, { Fragment, useState, useEffect } from 'react';
import getFactory from '../../request/index';
import { SearchOutlined } from '@ant-design/icons';
import errorNotification from '../../general/errorNotification';


const HomeSearch = ({ search, setSearch, type }) => {

    // const [type, setType] = useState([])
    // const [search, setSearch] = useState("")
    const [searchValues, setSearchValues] = useState({
        type: "",
        input: "",
        from: "",
        to: ""
    })

    const API = getFactory('product');

    // useEffect(() => {

    //     const getTypes = async () => {
    //         const API = getFactory('product');
    //         try {
    //             const res = await API.getType("")
    //             setType(res.data)
    //         } catch {
    //             setType([])
    //         }
    //     }
    //     getTypes()
    // }, [])

    // console.log(type)
    // const onChangeTypeSearch = (val) => {
    //     console.log(val)
    //     setSearchValues({ ...searchValues, type: val })
    // }
    // const onChangeInputSearch = (val) => {
    //     console.log(val)
    //     setSearchValues({ ...searchValues, input: val })
    // }
    const searchProduct = () => {
        console.log(searchValues)
        if (searchValues.from && searchValues.to) {
            if (parseInt(searchValues.from) > parseInt(searchValues.to)) {
                errorNotification("Giá trị bắt đầu phải nhỏ hơn hoặc bằng giá trị kết thúc")
                return
            }
        } else if (searchValues.from || searchValues.to) {
            errorNotification("Vui lòng điền trị bắt đầu và kết thúc")
            return
        }
        let s = "";
        for (const key in searchValues) {
            if (searchValues[key]) {
                if (s) {
                    s += `&${key}=${searchValues[key]}`
                }
                else {
                    s += `?${key}=${searchValues[key]}`
                }
            }
        }
        setSearch(s)
    }
    return (
        <div className="home_search">
            <select onChange={(val) => setSearchValues({ ...searchValues, type: val.target.value })}>
                <option value="">Nhóm sản phẩm</option>
                {type.map(t => <option key={t.id} value={t.id}>{t.type}</option>)}
            </select>
            <input onChange={(val) => setSearchValues({ ...searchValues, input: val.target.value })} name="search" placeholder="Tìm kiếm sản phẩm" />
            <div className="home_search_input_number">
                <input onChange={(val) => setSearchValues({ ...searchValues, from: val.target.value })} type="number" id="quantity" name="quantity" min="0" step="1" placeholder="Giá từ"></input>
                -
                <input onChange={(val) => setSearchValues({ ...searchValues, to: val.target.value })} type="number" id="quantity" name="quantity" min="0" step="1" placeholder="Tới"></input>
            </div>

            <button onClick={searchProduct} ><SearchOutlined /></button>
        </div>
    )
}
export default HomeSearch;