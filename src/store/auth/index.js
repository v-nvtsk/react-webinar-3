import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    return {
      token: null,
      _id: null,
      username: null,
      waiting: true
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Начинаем аутентификацию, ставим флаг ожидания');

    try {
      const response = await fetch(`/api/v1/users/sign?fields=_id%2Cprofile%28name%29`,
        {
          method: 'POST',
          body: JSON.stringify({
            login,
            password,
            remember: true
          }), headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Токен получен
      this.setState({
        error: null,
        token: json.result.token,
        _id: json.result._id,
        username: json.result.user.profile.name,
        waiting: false
      }, 'Получен auth token');
      localStorage.setItem('token', json.result.token);
      return json.result.token;
    } catch (e) {
      this.setState({
        error: e.message,
        token: null,
        _id: null,
        username: null,
        waiting: false
      }, "Ошибка аутентификации");
    }
  }
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Удаление токена, ставим флаг ожидания');

    try {
      const response = await fetch(`/api/v1/users/sign`,
        {
          method: 'DELETE',
          body: '',
          headers: {
            'X-Token': this.getState().token,
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Удаляем все данные
      this.setState({
        error: null,
        token: null,
        _id: null,
        username: null,
        waiting: false
      }, 'SignOut');
      localStorage.removeItem('token');

    } catch (e) {
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        error: e.message,
        token: null,
        _id: null,
        username: null,
        waiting: false
      });
    }
  }

  async restoreSession() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Проверяем сессию, ставим флаг ожидания');
      return
    };

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Проверяем сессию, ставим флаг ожидания');

    try {
      const response = await fetch(`/api/v1/users/self?fields=token%2C_id%2Cprofile%28name%29`,
        {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Токен получен
      this.setState({
        error: null,
        token,
        _id: json.result._id,
        username: json.result.profile.name,
        waiting: false
      }, 'Восстановлена сессия по данным токена');

    } catch (e) {
      // Ошибка при загрузке
      localStorage.removeItem('token');
      this.setState({
        error: e.message,
        token: null,
        _id: null,
        username: null,
        waiting: false
      }, 'Ошибка восстановления сессии при проверке токена по API');
    }

  }
  resetErrorState() {
    if (!this.getState().error) return
    this.setState({
      ...this.getState(),
      error: null
    }, 'Сброс ошибки');
  }
}

export default AuthState;
