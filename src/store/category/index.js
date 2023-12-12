import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      active: null
    }
  }

  async loadCategories() {
    // load from API:
    // GET http://example.front.ylab.io/api/v1/categories?fields=_id,title,parent(_id)&limit=*
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json()
    const result = json.result
    const items = result.items.map(el => {
      return { title: el.title, value: el._id }
    })
    const list = [{ title: 'Все', value: '' }, ...items];

    this.setState({
      ...this.getState(),
      list
    }, 'Загружен список категорий из АПИ');
  }
}

export default CatalogState;

