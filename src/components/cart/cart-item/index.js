import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatMoney } from "../../../utils";
import './style.css';

function CartItem(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onAction(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{formatMoney(props.item.price)}</div>
      {props.item.count &&
        <div className='Item-count'>{props.item.count} шт</div>
      }
      <div className='Item-actions'>
        <button className="Item-btn" onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func
};

CartItem.defaultProps = {
  onDelete: () => { }
}

export default React.memo(CartItem);
