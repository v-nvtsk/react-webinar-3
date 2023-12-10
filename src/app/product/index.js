import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useSelector from "../../store/use-selector";
import ProductData from '../../components/product-data';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Basket from '../basket';
import MainMenu from '../../components/main-menu';

function Product() {
  const navigate = useNavigate();
  const { data, store } = useLoaderData();
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    document.title = `Simple SPA: ${data.title}`;
  })

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(data._id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    navigate: useCallback((url) => {
      console.log('url: ', url);
      navigate(url);
    }, []),
  }

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));


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
