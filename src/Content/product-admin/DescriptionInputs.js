import React, { useState } from 'react';


const DescriptionInputs = ({ descriptions, description, index, setDescriptions }) => {
    const [x, setx] = useState("")
    function getBase64(file) {
        var reader = new FileReader();
        reader.onloadend = function () {
            setx(reader.result)
        }
        reader.readAsDataURL(file);
        return reader
    }
    const handleImageChange = (val) => {
        setDescriptions(descriptions.slice(0, index).concat({ ...descriptions[index], "img": val.target.files[0] }).concat(descriptions.slice(index + 1)))
        getBase64(val.target.files[0])

    }

    const handleChange = (val) => {
        setDescriptions(descriptions.slice(0, index).concat({ ...descriptions[index], "text": val.target.value }).concat(descriptions.slice(index + 1)))
    }
    return (
        <>
            <p>
                <input type="text" placeholder='Chi tiết' id='text' onChange={handleChange} />
            </p>

            <label className="custom-file-upload">
                <input type="file"
                    id="image"
                    accept="image/png, image/jpeg" onChange={handleImageChange} />
                    Custom Upload
                    {x ? <img src={x} alt="ảnh" /> : <div></div>}
            </label>
        </>
    )
}
export default DescriptionInputs;