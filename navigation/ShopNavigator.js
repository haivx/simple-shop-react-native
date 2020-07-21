import React from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Platform, Button } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import HeaderButton from '../components/UI/HeaderButton'
import OrderScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import * as productsActions from '../store/actions/products';

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

const ProductNavigator = (props) => (
  <NavigationContainer>
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
    </Drawer.Navigator>
  </NavigationContainer>
)

export default ProductNavigator
