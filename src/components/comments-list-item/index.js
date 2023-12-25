import { memo } from 'react';
import PropTypes from 'prop-types';
import 'style.css';

function CommentsListItem(props) {
  let { item, level, renderItem, renderForm } = props;
  if (!item) return;
  item = { ...item, level }
  return (
    <div key={item._id} className='CommentsList-item' >
      {renderItem(item)}
      {
        item?.children?.length > 0 &&
        item?.children?.map(subitem => {
          return <CommentsListItem key={subitem._id} item={subitem} level={level + 1}
            renderItem={renderItem} renderForm={renderForm} />
        })
      }
      {renderForm(item)}
    </div >
  )
}


CommentsListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.array
  }).isRequired,
  level: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  renderForm: PropTypes.func.isRequired
};

CommentsListItem.defaultProps = {
  level: 0
}

export default memo(CommentsListItem);
