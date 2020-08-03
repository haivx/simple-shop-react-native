import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Platform, AsyncStorage } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import HeaderButton from '../components/UI/HeaderButton'
import OrderScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import * as productsActions from '../store/actions/products'
import AuthScreen from '../screens/user/AuthScreen'
import Profile from '../screens/user/Profile'
import Contact from '../screens/contact/Contact'
import Map from '../screens/contact/Map'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()

const orderStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="OrdersScreen" headerTincolor="#fff">
      <Stack.Screen
        name={'OrdersScreen'}
        component={OrderScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'Orders',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  )
}
const productStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverview"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
      headerTincolor="#fff"
    >
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'All Product',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title={'Cart'}
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  navigation.navigate('CartScreen')
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  )
}
const adminNavigator = (props) => {
  const dispatch = useDispatch()
  return (
    <Stack.Navigator initialRouteName="UserProductScreen" headerTincolor="#fff">
      <Stack.Screen
        options={{
          headerTitle: 'Your product',
        }}
        name="UserProductScreen"
        options={({ navigation, route }) => ({
          headerTitle: 'All Product',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title={'Edit'}
                iconName={
                  Platform.OS === 'android' ? 'md-create' : 'ios-create'
                }
                onPress={() => {
                  navigation.navigate('EditProductScreen')
                }}
              />
            </HeaderButtons>
          ),
        })}
        component={UserProductScreen}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{
          headerTitle: 'Edit or Add',
          drawerLabel: 'Edit',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

const contactStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Contact" headerTincolor="#fff">
      <Stack.Screen
        name={'Contact'}
        component={Contact}
        options={({ navigation, route }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name={'Map'}
        component={Map}
        options={({ navigation, route }) => ({
          headerTitle: 'Map',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={'ios-pin'}
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  )
}
const profileStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Profile" headerTincolor="#fff">
      <Stack.Screen
        name={'Profile'}
        component={Profile}
        options={({ navigation, route }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer()
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

const ProductNavigator = (props) => {
  const [isLoggedIn, setIsloggedIn] = useState(false)

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      const transformedData = userData ? JSON.parse(userData) : {}
      const { token, userId, expirationDate } = transformedData
      const expiryDate = new Date(expirationDate)

      let isExpired = expiryDate <= new Date() || !token || !userId
      setIsloggedIn(isExpired)
    }
    tryLogin()
  }, [])

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator initialRouteName="ProductsOverview">
          <Drawer.Screen
            name="OrdersScreen"
            component={orderStack}
            options={{
              drawerLabel: 'Order',
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ProductsOverview"
            component={productStack}
            options={{
              drawerLabel: 'Product',
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="UserProductScreen"
            component={adminNavigator}
            options={{
              drawerLabel: 'Admin',
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Contact"
            component={contactStack}
            options={{
              drawerLabel: 'Contact',
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name={'ios-pin'}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="Profile"
            component={profileStack}
            options={{
              drawerLabel: 'Profile',
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name={'ios-person'}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={AuthScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default ProductNavigator
