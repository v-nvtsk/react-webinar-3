import { memo, useCallback, useEffect } from "react";
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { generatePagesList } from '../../utils';

function Pagination({ totalPages, currentPage, navigate }) {
  const cn = bem('pagination');

  const { pages, currPageIndex } = generatePagesList(currentPage, totalPages);
  if (!pages) return null;

  const callbacks = {
    onClick: useCallback((e) => {
      e.preventDefault();
      navigate(e.target.pathname)
    })
  }

  return (
    <ul className={cn()}>
      {pages.map((page, index) => (
        <li key={index} className={cn(index === currPageIndex ? 'page active' : 'page')}>
          {page === '...' ? <span className='no-link'> {page}</span> :
            <a href={`/page/${page}`} onClick={callbacks.onClick} className={cn('link')}> {page} </a>
          }
        </li>
      ))
      }
    </ul >
  )
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  navigate: PropTypes.func
}

export default memo(Pagination);