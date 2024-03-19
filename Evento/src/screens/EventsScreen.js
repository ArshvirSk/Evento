import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EventTile from '../components/EventTile';
import { EVENTS } from '../data/data';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const EventsScreen = ({ navigation }) => {
  function renderEventItem(itemData) {
    function pressHandler() {
      navigation.navigate('EventDetails', {
        eventId: itemData.item.id,
      });
    }

    return <EventTile {...itemData.item} onPress={pressHandler} />;
  }

  return (
    <FlatList
      data={EVENTS}
      keyExtractor={(item) => item.id}
      renderItem={renderEventItem}
      numColumns={2}
      style={styles.listContainer}
    />
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    color: '#000',
  },
});
