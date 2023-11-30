import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAction, actionName }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAction={onAction} actionName={actionName} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func,
  actionName: PropTypes.oneOf(['Добавить', 'Удалить'])
};

List.defaultProps = {
  onAction: () => {
  },
  actionName: 'Добавить'
}

export default React.memo(List);
