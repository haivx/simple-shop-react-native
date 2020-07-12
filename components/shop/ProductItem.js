import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform
} from 'react-native'
import Colors from '../../constants/Colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  } 
  return (
    <View style={styles.product}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.price && props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
    </TouchableCmp>
      </View>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 4,
  },
  details: {
    alignItems: 'center',
    fontFamily: 'open-sans-bold',
    height: '17%',
    padding: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans-bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '23%',
    paddingHorizontal: 20,
  },
})

export default ProductItem
