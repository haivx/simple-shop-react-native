import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Contact = () => {
  const navigation = useNavigation()
  const handleOnPress = (value) => () => {
    navigation.navigate('Map')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Store List</Text>
      <View>
        <Text style={styles.subTitle}>1. Hoang Mai</Text>
        <View onStartShouldSetResponder={handleOnPress(1)}>
          <Text style={styles.address}>112 Tan Mai, Hoang Mai, Hanoi</Text>
        </View>
      </View>
      <View>
        <Text style={styles.subTitle}>2. Thanh Xuan</Text>

        <View onStartShouldSetResponder={handleOnPress(2)}>
          <Text style={styles.address}>11 Nguyen Trai, Thanh Xuan, Hanoi</Text>
        </View>
      </View>
      <View>
        <Text style={styles.subTitle}>3. Cau GIay</Text>

        <View onStartShouldSetResponder={handleOnPress(3)}>
          <Text style={styles.address}>112 Cau GIay, Cau giay, Hanoi</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    display: 'flex',
    width: '100%',
  },
  add: {
    display: 'flex',
  },
  address: {
    color: '#29a2ba',
    width: '100%',
    display: 'flex',
  },
})
export default Contact
