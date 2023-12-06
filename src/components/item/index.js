import {memo, useState} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import './style.css';

function Item(props) {
  const navigate = useNavigate();

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item._id)
    },
    onClick: (e) => {
      e.preventDefault();
      navigate(`/products/${props.item._id}`);
    }
  }
  return (
    <div className={cn()} onClick={callbacks.onClick}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
