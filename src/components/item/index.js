import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item._id)
    },
    onClick: (e) => {
      e.preventDefault();
      props.onClick(props.href)
    }
  }
  return (
    <div className={cn()}>
      <a className={cn('title')} href={props.href} onClick={callbacks.onClick}> {props.item.title}</a>
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
    price: PropTypes.number,
  }).isRequired,
  href: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => { },
}

export default memo(Item);
