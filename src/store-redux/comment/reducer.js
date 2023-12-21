// Начальное состояние
export const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/load-start":
      return { ...state, waiting: true };

    case "comment/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comment/add-start":
      return { ...state, waiting: true };

    case "comment/add-success":
      return { ...state, waiting: false };

    case "comment/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
