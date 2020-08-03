import Product from "../../models/product"

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS' 

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.idToken;
    await fetch(
      `https://simple-react-native-f23d5.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    })
  }

}

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    console.log('STATE', getState())
    const response = await fetch(
      'https://simple-react-native-f23d5.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    )
    const responseData = await response.json()
    console.log('response', response)
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
      },
    })
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch('https://simple-react-native-f23d5.firebaseio.com/products.json')

    const resData = await response.json();
    const loadedProducts = [];
    for(const key in resData) {
      loadedProducts.push(new Product(
        key,
        'u1',
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price,
      ))
    }
    
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts
    })
  }
}

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async dispatch => {
    await fetch(
      `https://simple-react-native-f23d5.firebaseio.com/products/${id}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    )
    
    return dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        price
      },
    })
  }

}
