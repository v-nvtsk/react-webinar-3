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
      const items = [...state.data.items, action.payload.data].sort((a, b) => {
        return (new Date(a.dateCreate) - new Date(b.dateCreate))
      });
      return { ...state, data: { items: [...items], count: items.length }, waiting: false };

    case "comment/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
