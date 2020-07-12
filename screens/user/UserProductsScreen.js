import React, { useState } from 'react'
import { FlatList, View, Text, Button } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts)
  const dispatch = useDispatch()
  const editProductHandler = (id) => {
    props.navigation.navigate('EditProductScreen', { productId: id })
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => {
             
          }} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id))
            }}
          />
        </ProductItem>
      )}
    />
  )
}
export default UserProductScreen
