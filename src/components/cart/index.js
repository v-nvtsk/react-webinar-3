import React from 'react'
import ReactDOM from 'react-dom'
import Head from '../head';
import List from '../list'
import './style.css';
import { formatMoney } from '../../utils';


export default function Cart({ cart, isModalActive, onCloseButtonClick, onDeleteItem }) {
  if (!isModalActive) {
    document.body.classList.remove("scroll-lock")
    return null
  }
  document.body.classList.add("scroll-lock");

  const callbacks = {
    onBackDropClick: ({ currentTarget, target }) => {
      if (currentTarget === target) {
        onCloseButtonClick();
      }
    },
    onEscapeKeyDown: (e) => {
      if (e.key === 'Escape') onCloseButtonClick();
    }
  }
  document.addEventListener('keydown', callbacks.onEscapeKeyDown)


  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={callbacks.onBackDropClick}>
      <div className="modal">
        <Head title='Корзина' hasActiveButton={true} onButtonClick={onCloseButtonClick} />
        <div className="body">
          <List list={Object.values(cart.list)} actionType='delete' onAction={onDeleteItem} />
        </div>
        <div className="footer">
          <p className="Cart-total">
            Итого
            <span className="Cart-total-value">
              {formatMoney(cart.total.totalCost)}
            </span>
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

