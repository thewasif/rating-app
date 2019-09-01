import React from 'react';

const Card = (props) => {
    const { title, img, rating } = props;
    return (
        <div className="card">
            <img src={img} className="img" alt="" />
            <div className='card-body'>
                <h2>{title}</h2>
                {rating}
            </div>
            
        </div>
    )
}
export default Card;