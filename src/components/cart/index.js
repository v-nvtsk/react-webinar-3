import React from 'react'
import CartHead from './cart-head';
import List from '../list'
import PropTypes from 'prop-types';
import './style.css';
import { formatMoney } from '../../utils';


function Cart({ cart, onCloseButtonClick, onDeleteItem }) {

  return (
    <div className='Cart'>
      <CartHead title='Корзина' onButtonClick={onCloseButtonClick} />
      <div className="Cart-body">
        {
          cart.total.itemsCount > 0 ?
            <List list={Object.values(cart.list)} actionType='delete' onAction={onDeleteItem} /> :
            <div className="Cart-is-empty">Пусто</div>
        }
      </div>
      <div className="Cart-footer">
        <p className="Cart-total-text">Итого</p>
        <p className="Cart-total-value">{formatMoney(cart.total.totalCost)}</p>
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