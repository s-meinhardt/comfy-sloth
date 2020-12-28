import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const min_price = Math.min(...action.payload.map(product => product.price))
      const max_price = Math.max(...action.payload.map(product => product.price))
      // need to use the spread operator to get two copies of rather than two pointers to action.payload
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price, min_price, price: max_price },
      }
    }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    case UPDATE_SORT:
      return { ...state, sort: action.payload }
    case SORT_PRODUCTS: {
      let { sort, filtered_products: products } = state
      if (sort === 'price-lowest') products.sort((a, b) => a.price - b.price)
      if (sort === 'price-highest') products.sort((a, b) => b.price - a.price)
      if (sort === 'name-a') products.sort((a, b) => a.name.localeCompare(b.name))
      if (sort === 'name-z') products.sort((a, b) => b.name.localeCompare(a.name))
      return { ...state, filtered_products: products }
    }
    case UPDATE_FILTERS: {
      return { ...state, filters: { ...state.filters, [action.payload.name]: action.payload.value } }
    }
    case FILTER_PRODUCTS: {
      const {
        all_products,
        filters: { text, category, company, color, price, shipping },
      } = state
      let products = [...all_products]
      if (text !== '') products = products.filter(product => product.name.toLowerCase().includes(text))
      if (category !== 'all') products = products.filter(product => product.category.toLowerCase() === category)
      if (company !== 'all') products = products.filter(product => product.company.toLowerCase() === company)
      if (color !== 'all') products = products.filter(product => product.colors.includes(color))
      products = products.filter(product => product.price <= price)
      products = products.filter(product => (shipping ? product.shipping : true))
      return { ...state, filtered_products: products }
    }
    case CLEAR_FILTERS:
      return {
        ...state,
        filtered_products: [...state.all_products],
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
    default:
      break
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
