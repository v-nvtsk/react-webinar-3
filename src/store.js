
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cartList = {};
    this.state.cartTotal = {
      itemsCount: 0,
      totalCost: 0
    };

    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи в корзину
   */
  addItem(code) {
    const cartListCopy = { ...this.state.cartList };
    cartListCopy[code] = cartListCopy[code] === undefined ? 1 : cartListCopy[code] += 1;
    const cartTotalCopy = { ...this.state.cartTotal };
    cartTotalCopy.itemsCount = Object.keys(cartListCopy).length;
    cartTotalCopy.totalCost += this.itemFetch(code).price;
    this.setState(
      {
        ...this.state,
        cartList: { ...cartListCopy },
        cartTotal: { ...cartTotalCopy }
      }
    )
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const productItem = this.itemFetch(code)
    const cartListCopy = { ...this.state.cartList };
    const cartTotalCopy = { ...this.state.cartTotal };
    cartTotalCopy.itemsCount -= 1;
    cartTotalCopy.totalCost -= productItem.price * cartListCopy[code];
    delete cartListCopy[code];

    this.setState({
      ...this.state,
      cartList: { ...cartListCopy },
      cartTotal: { ...cartTotalCopy }
    })
  };
  itemFetch(code) {
    const productItem = this.state.list.filter(item => item.code === Number(code))[0];
    return productItem;
  }
}

export default Store;
