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
    const result = json.result.items;

    let list = [{ title: 'Все', value: '', parent: null }]
    let tree = {};
    for (let i = 0; i < result.length; i++) {
      let item = {
        title: result[i].title,
        value: result[i]._id,
        parent: result[i].parent?._id || null
      };
      if (!tree[item.parent]) tree[item.parent] = []
      tree[item.parent].push(item)
    }

    /**
     * Сворачивает дерево структуры категорий в массив с измененеием
     * имен категорий в соответствии с иерархией.
     *
     * @param {number} pid - Родительский ID.
     * @param {number} [depth=-1] - Глубина вложенности.
     */
    const collapseTree = (pid, depth = -1) => {
      depth++;
      const items = tree[pid]
      if (items) {
        items.forEach((item) => {
          if (pid !== null) {
            item.title = '- '.repeat(depth) + item.title;
          }
          list.push(item);
          collapseTree(item.value, depth)
        })
      }
      return
    }
    collapseTree(null);

    this.setState({
      ...this.getState(),
      list
    }, 'Загружен список категорий из АПИ');
  }
}

export default CatalogState;
