import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Button, ActivityIndicator, View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/carts'
import * as ProductActions from '../../store/actions/products'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = (props) => {
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.availableProducts)
  const navigation = useNavigation()
  const selectItemHandler = () => (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  }
  const loadProduct = useCallback(async () => {
    setLoading(true)
    try {
      await dispatch(ProductActions.fetchProducts())
    } catch (err) {

    }
    setLoading(false)
  }, [dispatch, setLoading])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus',loadProduct)

    return () => {
      willFocusSub.remove()
    }
  },[loadProduct])
  
  useEffect(() => {
    loadProduct()
  }, [loadProduct])
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
          onAddToCart={() => {
            dispatch(CartActions.addToCart(itemData.item))
          }}
          title={itemData.item.title}
          image={itemData.item.imageUrl}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title="To cart"
            onPress={() => {
              dispatch(CartActions.addToCart(itemData.item))
            }}
          />
        </ProductItem>
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ProductsOverviewScreen
