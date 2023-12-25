import React from 'react'
import './style.css'

function CommentsHead({ commentsCount, t }) {
  return (
    <h2 className={'Comments-title'}>{t('comment.title')} ({commentsCount})</h2>
  )
}

export default CommentsHead