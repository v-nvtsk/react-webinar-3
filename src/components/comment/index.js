import { useState } from 'react';
import dateFormat from '../../utils/date-format';
import './style.css'
import { cn as bem } from '@bem-react/classname'

function Comment({ currentUser, comment, onShowAddReplyForm }) {
  const cn = bem('Comment');

  const [isFormShown, setIsFormShown] = useState(false)
  const callbacks = {
    onClick: (e) => {
      e.preventDefault();
      setIsFormShown(!isFormShown);
      console.log('isFormShown: ', isFormShown);
      onShowAddReplyForm(comment._id)
    }
  }
  return (
    <div className={cn()} style={{ 'paddingLeft': comment.level * 30 }}>
      <div className={cn('head')}>
        <span className={cn('name', { currentUser: currentUser })}>{comment.author.profile.name}</span>
        <span className={cn('date')}>{dateFormat(comment.dateCreate)}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <p className={cn('reply')}>
        <a className={cn('reply-link')} href="" onClick={callbacks.onClick}>Ответить</a>
      </p>
    </div >
  )
}

export default Comment