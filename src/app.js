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
  const cartList = store.getState().cartList;
  const cartTotal = store.getState().cartTotal;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),
    onShowCart: () => {
      setModalShow(true);
    },
    onCloseCart: () => {
      setModalShow(false);
    },
    onItemFetch: (code) => {
      return store.itemFetch(code);
    }
  }

  const renderProductsItem = (item) => { return (<Item key={item.code} item={item} onAddItem={callbacks.onAddItem} />) }

  return (<>
    <PageLayout>
      <Head title='Магазин' />
      <Controls onShowCart={callbacks.onShowCart} cartTotal={cartTotal} />
      <List items={list} renderItem={renderProductsItem} />
    </PageLayout>
    <Modal isModalActive={isModalShow} onCloseButtonClick={callbacks.onCloseCart}>
      <Cart cartList={cartList} cartTotal={cartTotal} onItemFetch={callbacks.onItemFetch} onCloseButtonClick={callbacks.onCloseCart} onDeleteItem={callbacks.onDeleteItem} />
    </Modal>
  </>);
}

export default App;
