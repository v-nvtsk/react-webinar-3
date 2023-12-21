import React from 'react'
import './style.css'

function CommentsHead({ commentsCount }) {
  return (
    <h2 className={'Comments-title'}>Комментарии ({commentsCount})</h2>
  )
}

export default CommentsHead