import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import * as Location from 'expo-location'

const LocationPicker = (props) => {
  const [location, setLocation] = useState({})
  const [errorMsg, setErrorMsg] = useState({})

  console.log('LOCATIONLOCATION', location)
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      location.lat
    },${
      location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      location.lat
    },${props.location.lng}&key=${ENV.googleApiKey}`;
  };
  useEffect(() => {
    try {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert(
            'Permission to access location was denied',
            'You need to grant location permission to use this feature',
            [{ text: 'OK' }]
          )
        }

        let location = await Location.getCurrentPositionAsync({})
          setLocation(location)
      })()
    } catch (e) {
      console.log('eeee', e)
    }
  }, [])

  return (
    <View style={styles.sreen}>
      {location ? (
        <Image source={{ uri: urlPreview }} />
      ) : (
        <Text>No Map available</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 5,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LocationPicker
