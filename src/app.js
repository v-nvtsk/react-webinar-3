import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import './app.css';
import Modal from './components/modal';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalShow, setModalShow] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartTotal = cart.total;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),
    onShowCart: () => {
      setModalShow(true);
    },
    onCloseCart: () => {
      setModalShow(false);
    }
  }

  const renderProductsItem = (item) => { return (<Item key={item.code} item={item} onAddItem={callbacks.onAddItem} />) }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls onShowCart={callbacks.onShowCart} cartTotal={cartTotal} />
      <List items={list} renderItem={renderProductsItem} />
      <Modal isModalActive={isModalShow} onCloseButtonClick={callbacks.onCloseCart}>
        <Cart cart={cart} onCloseButtonClick={callbacks.onCloseCart} onDeleteItem={callbacks.onDeleteItem} />
      </Modal>
    </PageLayout>
  );
}

export default App;
