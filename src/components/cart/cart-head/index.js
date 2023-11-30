import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartHead({ title, onButtonClick }) {
  return (
    <div className='Head'>
      <h2 className='Head-title'>{title}</h2>
      <div className="Head-actions">
        <button className="Head-actions-btn" onClick={onButtonClick}>Закрыть</button>
      </div>
    </div>
  )
}

CartHead.propTypes = {
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
  hasActiveButton: PropTypes.bool
};

CartHead.defaultProps = {
  title: "",
  onButtonClick: () => { },
  hasActiveButton: false
}

export default React.memo(CartHead);
