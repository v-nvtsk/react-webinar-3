import React from 'react'
import CartHead from './cart-head';
import List from '../list'
import PropTypes from 'prop-types';
import './style.css';
import { formatMoney } from '../../utils';
import CartItem from './cart-item';


function Cart({ cartList, cartTotal, onCloseButtonClick, onDeleteItem, onItemFetch }) {

  const renderCartItem = (code) => {
    const item = onItemFetch(code);
    const cartItemData = {
      code: Number(code),
      title: item.title,
      count: cartList[code],
      price: item.price
    }
    return (<CartItem key={code} item={cartItemData} onAction={onDeleteItem} />)
  }

  return (
    <div className='Cart'>
      <CartHead title='Корзина' onButtonClick={onCloseButtonClick} />
      <div className="Cart-body">
        {<List items={Object.keys(cartList)} renderItem={renderCartItem} />}
      </div>
      <div className="Cart-footer total">
        <p className="total-text">Итого</p>
        <p className="total-value">{formatMoney(cartTotal.totalCost)}</p>
      </div>
    </div>
  )
}
Cart.propTypes = {
  cart: PropTypes.shape({
    list: PropTypes.object,
    total: PropTypes.shape({
      itemsCount: PropTypes.number,
      totalCost: PropTypes.number
    })
  }),
  onCloseButtonClick: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Cart.defaultProps = {
  cart: {
    list: {},
    total: {
      itemsCount: 0,
      totalCost: 0
    }
  },
  onCloseButtonClick: () => { },
  onDeleteItem: () => { }
}

export default React.memo(Cart)