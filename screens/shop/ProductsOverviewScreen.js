import React from 'react'
import { FlatList, Button } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/carts'
import Colors from '../../constants/Colors'


const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.availableProducts)
  const navigation = useNavigation()
  const selectItemHandler = () => (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
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
