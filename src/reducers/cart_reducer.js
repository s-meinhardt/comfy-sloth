import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload
      const tempItem = state.cart.find(item => item.id === id + color)
      if (tempItem) {
        const cart = state.cart.map(item =>
          item.id === id + color ? { ...item, amount: Math.min(item.max, item.amount + amount) } : item
        )
        return { ...state, cart }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    }
    case REMOVE_CART_ITEM:
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) }
    case CLEAR_CART:
      return { ...state, cart: [] }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload
      const cart = state.cart.map(item =>
        item.id === id ? { ...item, amount: Math.max(0, Math.min(item.max, item.amount + value)) } : item
      )
      return { ...state, cart }
    }
    case COUNT_CART_TOTALS: {
      const [total_items, total_amount] = state.cart.reduce(
        ([x, y], item) => [x + item.amount, y + item.amount * item.price],
        [0, 0]
      )
      return { ...state, total_items, total_amount }
    }
    default:
      break
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
