import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, formatMoney } from "../../utils";

function Controls({ onShowCart, cartTotal }) {

  const pluralItems = plural(cartTotal.itemsCount, { one: 'товар', few: 'товара', many: 'товаров' })
  const cartMessage = `${cartTotal.itemsCount} ${pluralItems} / ${formatMoney(cartTotal.totalCost)}`
  const emptyCartMessage = 'пусто'

  return (
    <div className='Controls'>
      <div className="Controls-cart">В корзине:
        <span className="Controls-cartInfo">
          {cartTotal.itemsCount > 0 ? cartMessage : emptyCartMessage}
        </span>
      </div>
      <div className="Controls-actions">
        <button className='Controls-actions-btn' disabled={!cartTotal.itemsCount} onClick={() => onShowCart()}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onShowCart: PropTypes.func,
  cartTotal: PropTypes.shape({
    itemsCount: PropTypes.number,
    totalCost: PropTypes.number
  })
};

Controls.defaultProps = {
  onShowCart: () => { },
  cartTotal: {
    itemsCount: 0,
    totalCost: 0
  }
}

export default React.memo(Controls);
