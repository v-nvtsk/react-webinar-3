import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ items, renderItem }) {
  return (
    <div className='List'>
      {items.map(item => renderItem(item))}
    </div>
  )
}

List.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: () => { },
}

export default React.memo(List);
