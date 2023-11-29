import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import './app.css';

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

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls onShowCart={callbacks.onShowCart} cartTotal={cartTotal} />
      <List list={list}
        actionType='add'
        onAction={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
