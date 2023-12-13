import React, { useRef } from 'react'
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname'
import './style.css'

function LoginForm(props) {
  const cn = bem('LoginForm')
  const login = useRef('login')
  const password = useRef('password')


  const callbacks = {
    onLogin: (e) => {
      e.preventDefault();
      props.onLogin(login.current.value, password.current.value);
    }
  }

  return (
    <form className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <label className={cn('label')} htmlFor="login">
        Логин<br />
        <input ref={login} className={cn('input')} id="login" type="text" />
      </label>
      <label className={cn('label')} htmlFor="password">
        Пароль<br />
        <input ref={password} className={cn('input')} id="password" type="password" />
      </label>
      <div className={cn('error', props.error ? 'active' : '')}>{props.error} </div>
      <button type='submit' onClick={callbacks.onLogin} className={cn('button')}>Войти</button>
    </form>
  )
}

export default LoginForm