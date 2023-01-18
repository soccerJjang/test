import React from 'react';
import * as RN from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

export const Error = (props) => {
    RN.Alert.alert(
        'Error',
        'error',
        [
            {
                text: '이동하기',
                onPress: () => props.navigation.navigate('SplashScreen')
            }
        ]
    )
}
