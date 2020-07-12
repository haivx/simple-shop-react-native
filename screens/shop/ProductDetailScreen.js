import React, { useEffect } from 'react'
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import * as cartActions from '../../store/actions/carts'

const ProductDetailScreen = (props) => {
  const dispatch = useDispatch()
  const productId = props.route.params.productId
  const productTitle = props.route.params.productTitle

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  )
  console.log(selectedProduct)
  useEffect(() => {
    props.navigation.setOptions({ title: productTitle })
  }, [])
  console.log('PROPS', props)
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Card" onPress={() => {
          dispatch(cartActions.ADD_TO_CART(selectedProduct))
        }} />
      </View>
      {/* <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text> */}
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 2,
  },
  description: {
    textAlign: 'center',
  },
})

export default ProductDetailScreen
