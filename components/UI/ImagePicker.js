import React from 'react'
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import Colors from '../../constants/Colors'

const ImageSelect = () => {
    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert('Insurficient permissions', 'You need to grant camera permission to use this app', [{text: 'OK'}])
            return false;
        }
        return true
    }

    const takeImage = async () => {
        const hasPermission = await verifyPermission()
        if (hasPermission) {
            ImagePicker.launchCameraAsync();
        }
            
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.preview}>
            <Text>No Image is picked yet</Text>
            <Image style={styles.image} />
            </View>

            <Button title="Text Image" color={Colors.primary} onPress={takeImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {} 
})

export default ImageSelect;