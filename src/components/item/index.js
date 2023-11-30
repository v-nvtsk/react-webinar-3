import React, {useState} from "react";
import PropTypes from "prop-types";
import { formatMoney } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onAction: (e) => {
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
        <button className="Item-btn" onClick={callbacks.onAction}>
          {props.actionName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  actionName: PropTypes.oneOf(['Добавить', 'Удалить']),
  onAction: PropTypes.func
};

Item.defaultProps = {
  onAction: () => { }
}

export default React.memo(Item);
