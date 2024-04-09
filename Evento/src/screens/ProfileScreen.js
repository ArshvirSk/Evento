import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EVENTS } from '../data/data';

const ProfileScreen = ({ route, navigation }) => {
    const { data } = route.params;
    const theme = useTheme();
    const [userDetailsEvents, setUserDetailsEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    let events = [];

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    console.log(data);
    // console.log(id);

    function renderEventItem(itemData) {
        const eventId = itemData.item.id;
        console.log(eventId);
        const mydata = Object.values({
            eventId,
            ...data,
        });

        console.log(mydata);

        function pressHandler() {
            navigation.navigate('EventDetails', { eventId: eventId, mydata: data });
            console.log('helloooo');
        }

        return (
            <View style={[styles.item, { backgroundColor: theme.colors.primary }]} >
                <Pressable
                    android_ripple={{ color: '#ccc' }}
                    style={({ pressed }) => [
                        styles.button,
                        pressed ? styles.buttonPressed : null,
                    ]}
                    onPress={pressHandler}
                >
                    <View style={styles.top}>
                        <View style={[styles.topContainer, { backgroundColor: theme.colors.secondary }]}>
                            <Text style={styles.title}>{itemData.item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View>
                            <Text style={styles.subText} >Time: {itemData.item.time}</Text>
                            <Text style={styles.subText}>{itemData.item.date}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    }

    useEffect(() => {
        async function getDetails() {
            const eventIds = await axios.post(
                'http://192.168.1.248:5000/userDetails',
                data
            );
            // console.log(events.data.message);

            setUserDetailsEvents(eventIds.data.message);

            console.log(userDetailsEvents);
        }
        getDetails();
    }, [refreshing]);

    events = userDetailsEvents.map((eventId) => {
        return EVENTS.find(event => event.id === eventId);
    });

    console.log(events);

    console.log('PROFILE_SCREEN', data.user);
    console.log('PROFILE_SCREEN', data.phone);
    console.log('PROFILE_SCREEN', data.pass);
    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ backgroundColor: theme.colors.background }} >
                    <View style={styles.container} >
                        <Text style={[styles.username, { color: '#000' }]} >Hi, {data.user}</Text>
                        <Text style={[styles.phonenum, { color: '#000' }]} >{data.phone}</Text>
                    </View>
                    <Divider style={{ height: 2, backgroundColor: '#000' }} horizontalInset />
                    <Text style={styles.head} >YOUR REGISTERED EVENTS</Text>
                </View>
                {events.length ? (
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id}
                        renderItem={renderEventItem}
                        numColumns={2}
                        style={[styles.listContainer, { backgroundColor: theme.colors.background }]}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={styles.head} >NO EVENTS FOUND</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        display: 'flex',
    },
    listContainer: {
        display: 'flex',
        color: '#000',
    },
    username: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    phonenum: {
        fontSize: 26,
        fontWeight: '400',
    },
    item: {
        flex: 1,
        margin: 16,
        // padding: 5,
        borderRadius: 15,
        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 16,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    titleContainer: {
        justifyContent: 'center',
        height: 75,
        padding: 14,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#fff',
    },
    top: {
        flex: 1,
        justifyContent: 'flex-top',
        // padding: 5,
    },
    topContainer: {
        padding: 14,
        height: 150,
        // backgroundColor: '#C3C3C3',
        borderRadius: 15,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    subText: {
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 1,
        fontSize: 13,
    },
    head: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 4,
    },
});
