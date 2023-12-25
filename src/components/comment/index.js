import dateFormat from '../../utils/date-format';
import './style.css'
import { cn as bem } from '@bem-react/classname'

function Comment({ currentUser, comment, onShowAddReplyForm, formShownId }) {
  const cn = bem('Comment');

  const callbacks = {
    onClick: (e) => {
      e.preventDefault();
      onShowAddReplyForm(comment._id)
    },
    onCancel: (e) => {
      e.preventDefault();
      onShowAddReplyForm();
    }
  }
  const MAX_LEVEL = 5;
  const paddingLeft = comment.level <= MAX_LEVEL ? comment.level * 30 : MAX_LEVEL * 30;

  const showCancelBtn = !currentUser && (formShownId === comment._id)

  return (
    <div className={cn()} style={{ 'paddingLeft': paddingLeft }}>
      <div className={cn('head')}>
        <span className={cn('name', { currentUser: currentUser })}>{comment.author.profile.name}</span>
        <span className={cn('date')}>{dateFormat(comment.dateCreate)}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <p className={cn('reply')}>
        <a className={cn('reply-link')} href="" onClick={callbacks.onClick}>Ответить</a>
        {showCancelBtn && <a className={cn('cancel-link')} href="" onClick={callbacks.onCancel}>Отменить</a>}
      </p>
    </div >
  )
}

export default Comment