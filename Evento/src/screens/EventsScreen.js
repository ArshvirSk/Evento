import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import EventTile from '../components/EventTile';
import { EVENTS } from '../data/data';

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

const EventsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { data } = route.params;
  function renderEventItem(itemData) {
    const eventId = itemData.item.id;
    const mydata = Object.values({
      eventId,
      ...data,
    });

    console.log(mydata);

    function pressHandler() {
      navigation.navigate('EventDetails', { eventId: eventId, mydata: data });
    }

    return <EventTile {...itemData.item} onPress={pressHandler} />;
  }

  return (
    <FlatList
      data={EVENTS}
      keyExtractor={(item) => item.id}
      renderItem={renderEventItem}
      numColumns={2}
      style={[styles.listContainer, { backgroundColor: theme.colors.background }]}
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
