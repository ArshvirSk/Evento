// Import React and Component
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            //Check if user_id is set or not
            //If not then send for Authentication
            //else send to Home Screen
            AsyncStorage.getItem('user_id').then((value) =>
                navigation.replace(
                    value === null ? 'Auth' : 'DrawerNavigationRoutes'
                ),
            );
        }, 5000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('C:\ASK_Main\ASK_College\MEGA PROJECT\PROJECT\Evento\src\assets\Evento_logo.png')}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
