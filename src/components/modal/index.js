import React from 'react'
import ReactDOM from 'react-dom'
import './style.css';

export default function Modal(props) {
  const { children, isModalActive, onCloseButtonClick } = props;
  if (!isModalActive) {
    document.body.classList.remove("scroll-lock")
    return null
  }
  document.body.classList.add("scroll-lock");

  const callbacks = {
    onBackDropClick: ({ currentTarget, target }) => {
      if (currentTarget === target) {
        onCloseButtonClick();
      }
    },
    onEscapeKeyDown: (e) => {
      if (e.key === 'Escape') onCloseButtonClick();
    }
  }
  document.addEventListener('keydown', callbacks.onEscapeKeyDown)


  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={callbacks.onBackDropClick}>
      <div className="modal">
        {children}
      </div>
    </div>,
    document.body
  )
}

