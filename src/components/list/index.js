import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ items, renderItem }) {
  if (items.length === 0) {
    return (<div className="List-isEmpty">Пусто</div>)
  } else {
    return (<div className='List'>{items.map(item => renderItem(item))}</div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: () => { },
}

export default React.memo(List);
