import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
// import { Icon } from 'react-native-vector-icons/Ionicons';

export default function EventTile({ id, title, date, time }) {
  const navigation = useNavigation();
  function selectEventHandler() {
    navigation.navigate('EventDetails', {
      eventId: id,
    });
    // console.log(id);
  }
  return (
    <View style={styles.item}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={selectEventHandler}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomContainer}>
            <Text style={{ color: '#000' }} >Time: {time}</Text>
            <Text style={{ color: '#000' }}>{date}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 12,
    // padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,

    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  titleContainer: {
    justifyContent: 'center',
    height: 75,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: '#000',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 5,
  },
  bottomContainer: {
    padding: 8,
    backgroundColor: '#C3C3C3',
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
