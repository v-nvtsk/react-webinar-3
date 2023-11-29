import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAction, actionType }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAction={onAction} actionType={actionType} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

List.defaultProps = {
  onAddItem: () => {
  },
  onSelectItem: () => {
  },
}

export default React.memo(List);
