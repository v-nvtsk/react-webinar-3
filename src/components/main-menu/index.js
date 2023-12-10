import { cn as bem } from '@bem-react/classname';
import BasketTool from "../../components/basket-tool";
import Navigation from "../../components/navigation";
import './style.css';
import { useCallback } from 'react';
// import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";

function MainMenu(props) {
  const cn = bem('MainMenu')

  const linksList = [
    {
      title: 'Главная',
      href: '/'
    },
  ]

  const callbacks = {
    onClick: (e) => {
      e.preventDefault();
      props.onNavigate(e.target.pathname)
    }
  };

  const renders = {
    links: useCallback((cn,link) => {
      return (<li key={link.href}>
        <a href={link.href} className={cn('link')} onClick={callbacks.onClick}>
          {link.title}
        </a>
      </li>)
    })
  };

  return (
    <div className={cn()}>
      <Navigation linksList={linksList} renderLinks={renders.links} />
      <BasketTool onOpen={props.onOpen} amount={props.amount} sum={props.sum} />
    </div>
  )
}

MainMenu.propTypes = {
  onOpen: PropTypes.func.isRequired,
  amount: PropTypes.number,
  sum: PropTypes.number
}

export default MainMenu
