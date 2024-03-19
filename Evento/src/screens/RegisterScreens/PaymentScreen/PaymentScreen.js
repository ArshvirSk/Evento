import axios from 'axios';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { EVENTS } from '../../../data/data';

const PaymentScreen = ({ route, navigation }) => {
    const { data } = route.params;

    const eventDets = EVENTS.find((event) => event.id === data[1]);

    // console.log(data);
    console.log(eventDets);

    const eventURL = 'http://evento-w3o7.onrender.com/' + eventDets.id;

    console.log(eventURL);

    const onSubmit = async () => {
        try {
            const response = await axios.post(
                eventURL,
                data
            );
            console.log(response.data);
            navigation.navigate('Drawer');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Text style={styles.title}>PaymentScreen</Text>
            <Text style={styles.title}>{eventDets.title}</Text>
            <Button title="Submit" onPress={onSubmit} />
        </View>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    title: {
        color: '#000',
    },
});
