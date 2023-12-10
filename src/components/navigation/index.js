import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import 'style.css';
import PropTypes from "prop-types";

function Navigation({ linksList, renderLinks }) {
  const cn = bem('Navigation');

  return (
    <ul className={cn('list')}>
      {linksList.map(link => renderLinks(cn, link))}
    </ul>

  )
}

Navigation.propTypes = {
  linksList: PropTypes.array,
  renderLinks: PropTypes.func
}

export default memo(Navigation);