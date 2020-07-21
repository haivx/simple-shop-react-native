import React, {
  useEffect,
  useCallback,
  useReducer,
  useLayoutEffect,
} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }

    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    console.log('STATA', updatedValidities ,updatedFormIsValid)
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    }
  }
  return state
}

const EditProductScreen = (props) => {
  const prodId = props.route.params?.productId
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  })

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log('AAA', inputIdentifier, inputValue, inputValidity)
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      })
    },
    [dispatchFormState]
  )

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title={'Edit'}
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
              if (!formState.formIsValid) {
                Alert.alert(
                  'Wrong input!',
                  'Please check the errors in the form.',
                  [{ text: 'Okay' }]
                )
                return
              }
              if (editedProduct) {
                dispatch(
                  productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                  )
                )
              } else {
                dispatch(
                  productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                  )
                )
              }
              props.navigation.goBack()
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [props.navigation, formState])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
})

export default EditProductScreen
