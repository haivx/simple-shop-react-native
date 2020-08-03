import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import LocationPicker from '../../components/UI/LocationPicker'

const Map = () => {
    return (
        <View style={styles.screen}>
            <Text>Map</Text>
            <LocationPicker />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    }
})

export default Map;