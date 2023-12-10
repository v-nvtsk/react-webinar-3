import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Basket from "../basket";
import { useParams, useNavigate } from "react-router-dom"
import MainMenu from '../../components/main-menu';
import useStore from '../../store/use-store';

function Main() {
  const navigate = useNavigate();
  const activeModal = useSelector(state => state.modals.name);

  const params = useParams()
  const page = Number(params.page) || 1;

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(page);
    document.title = `Simple SPA`;
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    navigate: useCallback((url) => {
      navigate(url);
    }, []),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item href={`/products/${item._id}`} item={item} onAdd={callbacks.addToBasket} onClick={callbacks.navigate} />
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <MainMenu onNavigate={callbacks.navigate} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <List list={select.list} renderItem={renders.item} />
        <Pagination totalPages={Math.ceil(Number(select.count) / 10)} currentPage={page} navigate={callbacks.navigate} />
      </PageLayout>
      {activeModal === 'basket' && <Basket navigate={callbacks.navigate} />}
    </>
  );
}

export default memo(Main);
