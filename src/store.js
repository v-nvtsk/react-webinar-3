
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = {
      list: {},
      total: {
        itemsCount: 0,
        totalCost: 0
      }
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
  addItem(item) {
    const cartList = { ...this.state.cart.list };
    cartList[item.code] !== undefined ? cartList[item.code].count += 1 : cartList[item.code] = { ...item, count: 1 };
    let cartTotal = { ...this.state.cart.total };
    cartTotal.itemsCount = Object.keys(cartList).length;
    cartTotal.totalCost += item.price;

    this.setState(
      {
        ...this.state,
        cart: {
          list: cartList,
          total: cartTotal
        }
      })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem({ code }) {
    const cartList = { ...this.state.cart.list };
    const cartTotal = { ...this.state.cart.total };
    cartTotal.itemsCount -= 1;
    cartTotal.totalCost -= cartList[code].count * cartList[code].price;
    delete cartList[code]

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: {
        list: cartList,
        total: cartTotal
      }
    })
  };
}

export default Store;
