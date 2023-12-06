import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductData from '../../components/product-data';
import { useLoaderData } from 'react-router-dom';

function Product(params) {
  const { data } = useLoaderData({});
  console.log('data: ', data);

  const store = useStore();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(data.id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const select = useSelector(state => ({
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));


  return (
    <PageLayout>
      <Head title={data.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <ProductData data={data} onAddItem={callbacks.addToBasket} />
    </PageLayout>

  );
}

export default memo(Product);
