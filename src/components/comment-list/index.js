import { memo } from 'react';
import PropTypes from 'prop-types';
import CommentsListItem from '../comments-list-item'
import './style.css';

function CommentsList({ renderItem, renderForm, commentsTree, t }) {
  return (commentsTree && <div className='CommentsList'>
    {commentsTree?.children?.map((item) => {
      return <CommentsListItem key={item._id}
        item={item} level={0}
        renderItem={renderItem}
        renderForm={renderForm}
        t={t} />
    })
    }
  </div>)
}

CommentsList.propTypes = {
  commentsTree: PropTypes.object.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderForm: PropTypes.func.isRequired,
};

export default memo(CommentsList);
