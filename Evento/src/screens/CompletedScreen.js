import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const CompletedScreen = ({ route, navigation }) => {
    const { data } = route.params;
    const { mydata } = route.params;
    const theme = useTheme();

    console.log(data);
    console.log(mydata);

    const handleSubmit = () => {
        navigation.navigate('Drawer');
    };

    const openWhatsapp = () => {
        Linking.openURL('https://chat.whatsapp.com/JQHfHNcHRlH9dD9WyRJpUA');
    };

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center' }} >
                <Text style={styles.text} >CONGRATULATIONS</Text>
                <Text style={styles.text} >{mydata.user} HAS BEEN REGISTERED!!!</Text>
                <View style={{ paddingTop: 10 }} >
                    <Text style={styles.sub} >Event: {data.title}</Text>
                    <Text style={styles.sub} >Event Date: {data.date}</Text>
                    <Text style={styles.sub} >Location: {data.location}</Text>
                </View>
            </View>
            {/* <Text style={styles.text} >Join our whatsapp group for more information!!!</Text> */}
            <View style={styles.bottom} >
                <Button
                    mode="contained-tonal"
                    // icon="home"
                    style={{
                        backgroundColor: '#25D366', marginTop: 20, paddingVertical: 7, borderRadius: 50,
                    }}
                    textColor="#fff"
                    labelStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 5 }}
                    uppercase
                    rippleColor={theme.colors.background}
                    onPress={openWhatsapp}
                >
                    <Icon
                        name="logo-whatsapp"
                        size={16}
                        color="#fff"
                    />
                    JOIN GROUP
                </Button>
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
            </View >
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
        textTransform: 'uppercase',
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
