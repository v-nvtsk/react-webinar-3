import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname'
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import { useCallback } from 'react';

function CommentAddForm(props) {
  const navigate = useNavigate();
  const inputRef = useRef();
  const formRef = useRef();
  const { t } = props;
  const cn = bem('CommentAddForm');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (props.level >= 0) {
      formRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [props.level])

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      props.onSubmitComment({
        pid: props.pid,
        pType: props.pType,
        text: commentText
      })
    }, [props, commentText]),
    onCancel: useCallback((e) => {
      e.preventDefault();
      props.onCancel()
    }, []),
    onChange: (e) => {
      setCommentText(e.target.value);
    },
    // Переход к авторизации
    onSignIn: useCallback((e) => {
      e.preventDefault();
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  }

  return (<div ref={formRef} className={cn({ global: props.level === -1 })} style={{ paddingLeft: props.level >= 0 ? (props.level * 30) : 40 }}>
    {
      props.token ?
        <form className={cn('form')}>
          <label className={cn('title')} htmlFor="comment-reply">
            {props.pType === 'article' ? t('comment.newComment') : t('comment.newReply')}
          </label>
          <textarea ref={inputRef} className={cn('input')} type="text" name="comment-reply" id="comment-reply" onChange={callbacks.onChange} cols="40" rows="5"></textarea>
          <div>
            <input className={cn('btn', 'btn-submit')} type="submit" value={t('comment.submit')} onClick={callbacks.onSubmit} />
            {props.pType !== 'article' && <input className={cn('btn', 'btn-cancel')} type="submit"
              value={t('comment.cancel')} onClick={callbacks.onCancel} />}
          </div>
        </form>
        :
        <p className={cn('not-authorized')}><Link className={cn('not-authorized-link')} to="/login" onClick={callbacks.onSignIn}>{t('comment.signIn')}</Link>{t('comment.signInTitle')}</p>
    }
  </div>
  )
}

CommentAddForm.propTypes = {
  onSubmit: PropTypes.func,
  t: PropTypes.func
};

export default CommentAddForm