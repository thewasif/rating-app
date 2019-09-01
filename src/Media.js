import React from 'react';
import './Ranks.css'
import { Rate, Badge } from 'antd';

const Media = (props) => {
    const {name, rating, img, count} = props;
    return (
        <div className="media">
            <img className="img-pro" src={img} alt="" />
            <div className='media-body'>
               <h3>{name}</h3>
               <Rate value={rating} allowHalf className="rate" />
            </div>
            <Badge count={count} className='badge' style={{background: '#4285F4'}} />
        </div>
    );
}

export default Media;