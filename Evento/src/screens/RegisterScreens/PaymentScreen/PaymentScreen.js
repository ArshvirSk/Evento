import axios from 'axios';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { EVENTS } from '../../../data/data';

const PaymentScreen = ({ route, navigation }) => {
    const { data, mydata } = route.params;
    const theme = useTheme();

    console.log(mydata);
    const eventDets = EVENTS.find((event) => event.id === data[1]);

    // console.log(data);
    console.log(eventDets);

    const eventURL = 'http://192.168.1.248:5000/' + eventDets.id;
    // const eventURL = 'http://evento-w3o7.onrender.com/' + eventDets.id;

    console.log(eventURL);

    const onSubmit = async () => {
        try {
            const response = await axios.post(
                eventURL,
                { data: data, mydata: mydata }
            );
            console.log(response.data);
            navigation.replace('Completed', { data: eventDets, mydata: mydata });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Text style={[styles.title, { marginTop: 150 }]}>{eventDets.title}</Text>
            <Text style={[styles.title, { marginBottom: 20 }]}>To Pay: ₹{eventDets.price}</Text>
            <View
                style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{
                        width: 300, height: 300, alignItems: 'center', justifyContent: 'center',
                    }}
                    source={require('C:/ASK_Main/ASK_College/MEGA PROJECT/PROJECT/Evento/src/assets/QR-code.png')} />
            </View>
            <View style={{
                justifyContent: 'flex-end',
            }} >
                <Button
                    mode="contained-tonal"
                    // icon="home"
                    style={{ backgroundColor: '#034694', marginTop: 20, paddingVertical: 7, borderRadius: 50, marginHorizontal: 15 }}
                    textColor="#fff"
                    labelStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 5 }}
                    uppercase
                    rippleColor={theme.colors.background}
                    onPress={onSubmit}
                >
                    Submit
                </Button>
            </View>
        </View>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    title: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
});
