import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useSelector from "../../store/use-selector";
import ProductData from '../../components/product-data';
import { useParams, useNavigate } from 'react-router-dom';
import Basket from '../basket';
import MainMenu from '../../components/main-menu';
import useStore from '../../store/use-store';

function Product() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  const product = useSelector(state => ({
    data: state.product.data
  }));
  const data = product.data;

  const select = useSelector(state => ({
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    document.title = `Simple SPA: ${data.title}`;
  })

  useEffect(() => {
    store.actions.product.loadProductById(_id);
  }, [store, _id])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(data._id), [store, data]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    navigate: useCallback((url) => {
      navigate(url);
    }, []),
  }




  return (
    <>
      <PageLayout>
        <Head title={data.title} />
        <MainMenu onNavigate={callbacks.navigate} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <ProductData data={data} onAddItem={callbacks.addToBasket} />
      </PageLayout>
      {activeModal === 'basket' && <Basket navigate={callbacks.navigate} />}
    </>
  );
}

export default memo(Product);
