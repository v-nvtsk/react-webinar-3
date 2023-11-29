import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, hasActiveButton, onButtonClick }) {
  return (
    <div className='Head'>
      <h1 className='Head-title'>{title}</h1>
      {hasActiveButton && <div className="Head-actions">
        <button className="Head-actions-btn" onClick={() => onButtonClick()}>Закрыть</button>
      </div>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
  hasActiveButton: PropTypes.bool
};

Head.defaultProps = {
  title: "",
  onButtonClick: () => { },
  hasActiveButton: false
}

export default React.memo(Head);
