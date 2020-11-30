import React from 'react';
import urls from '../../const';
const Description = ({ description }) => {
    const image = (description.img) ? <img className="description_img" src={`${urls}${description.img}`} alt="" /> : <div></div>
    return (
        <div className="descriptions">
            <p className="description_text">{description.text}</p>
            {image}
        </div>
    )
}
export default Description;