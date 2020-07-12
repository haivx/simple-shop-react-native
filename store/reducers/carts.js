import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/carts'
import CartItem from '../../models/cart-items'
import { ADD_ORDER } from '../actions/orders'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
  items: {},
  totalMount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title
      const { items } = state
      let updateOrNewCartItem
      if (items[addedProduct.id]) {
        updateOrNewCartItem = newCartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        )
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updateOrNewCartItem,
          },
          totalMount: state.totalMount + prodPrice,
        }
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updateOrNewCartItem,
          },
          totalMount: state.totalMount + prodPrice,
        }
      }
    case REMOVE_FROM_CART: {
      const currentQuantity = state.items[action.pid].quantity
      const selectedCartItem = state.items[action.pid]
      let updatedCartItems
      if (currentQuantity > 1) {
        updatedCartItems = new CartItem(
          state.items[action.pid] - 1,
          selectedCartItem.prodPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.prodPrice
        )
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItems }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.pid]
      }

      return {
        ...state,
        items: updatedCartItems,
        totalMount: state.totalMount - selectedCartItem.productPrice,
      }
    }

    case ADD_ORDER:
      return initialState
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state
      }
      const updatedItems = {
        ...state.items,
      }
      const itemTotal = state.items[action.pid].sum
      delete updatedItems[action.pid]
      return {
        ...state,
        items: updatedItems,
        totalMount: state.totalMount - itemTotal,
      }
    default:
      return state
  }
}
