import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import 'style.css';

function User(props) {
  const cn = bem('User');

  const callbacks = {
    onLoginNavigate: (e) => {
      e.preventDefault();
      props.onLoginNavigate();
    },
    onLogout: () => {
      props.onLogout();
    }
  }

  return (
    <div className={cn()}>
      {props.username && <Link to="/profile">{props.username}</Link>}
      <button onClick={props.username ? callbacks.onLogout : callbacks.onLoginNavigate}>
        {props.username ? 'Выход' : 'Вход'}
      </button>
    </div>
  )
}

export default User