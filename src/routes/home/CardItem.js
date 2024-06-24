import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Service Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
            <div className='cards__item__text'>
              <div className='cards__item__text'>
                <FontAwesomeIcon icon={faDollarSign} />
                <span className='cards__item__text'>   Price: {props.price}</span>
              </div>
              <div className='cards__item__text'>
                <FontAwesomeIcon icon={faClock} />
                <span className='cards__item__text'>   Duration: {props.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;