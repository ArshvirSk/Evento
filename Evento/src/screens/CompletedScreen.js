import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const CompletedScreen = ({ route, navigation }) => {
    const { data } = route.params;
    const theme = useTheme();

    const handleSubmit = () => {
        navigation.navigate('Drawer');
    };

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center' }} >
                <Text style={styles.text} >CONGRATULATIONS</Text>
                <Text style={styles.text} >YOU HAVE BEEN REGISTERED!!!</Text>
                <View style={{ paddingTop: 10 }} >
                    <Text style={styles.sub} >Event: {data.title}</Text>
                    <Text style={styles.sub} >Event Date: {data.date}</Text>
                    <Text style={styles.sub} >Location: {data.location}</Text>
                </View>
            </View>
            <View style={styles.bottom} >
                <Button
                    mode="contained-tonal"
                    // icon="home"
                    style={{ backgroundColor: '#034694', marginTop: 20, paddingVertical: 7, borderRadius: 50 }}
                    textColor="#fff"
                    labelStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 5 }}
                    uppercase
                    rippleColor={theme.colors.background}
                    onPress={handleSubmit}
                >
                    GO TO HOME
                </Button>
            </View>
        </>
    );
};

export default CompletedScreen;

const styles = StyleSheet.create({
    text: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    sub: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    bottom: {
        justifyContent: 'flex-end',
        // alignSelf: 'stretch',
        borderRadius: 50,
        // // elevation: 25,
        marginHorizontal: 20,
        marginBottom: 20,
        // overflow: 'hidden',
    },
});
