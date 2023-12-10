import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      data: {}
    }
  }

  // запрос по API отдельного товара
  async loadProductById(_id) {
    if (!_id) return {};
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);

    const json = await response.json();
    const result = {
      _id,
      description: json.result.description,
      title: json.result.title,
      country: json.result.madeIn.title,
      category: json.result.category.title,
      year: json.result.edition,
      price: json.result.price,
    }

    this.setState({
      ...this.getState(),
      data: result
    }, 'Загружены данные одного товара по Id из АПИ');

    return result;
  }
}

export default Product;
