import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import OrderItem from '../../components/shop/OrderItems'

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders)
  console.log('STATE', orders)

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
  // return itemDta.scre
}

export default OrderScreen
