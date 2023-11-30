import React from 'react'
import Head from '../head';
import List from '../list'
import './style.css';
import { formatMoney } from '../../utils';


export default function Cart({ cart, onCloseButtonClick, onDeleteItem }) {

  return (
    <div className='Cart'>
      <Head title='Корзина' hasActiveButton={true} onButtonClick={onCloseButtonClick} />
      <div className="Cart-body">
        {cart.total.itemsCount > 0 && <List list={Object.values(cart.list)} actionType='delete' onAction={onDeleteItem} />}
        {cart.total.itemsCount === 0 && <p className="Cart-is-empty">Пусто</p>}
      </div>
      <div className="Cart-footer">
        <p className="Cart-total-text">Итого</p>
        <p className="Cart-total-value">{formatMoney(cart.total.totalCost)}</p>
      </div>
    </div>
  )
}
