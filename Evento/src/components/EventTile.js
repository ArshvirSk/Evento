import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
// import { Icon } from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

export default function EventTile({ id, title, date, time, onPress }) {
  const theme = useTheme();

  return (
    <View style={[styles.item, { backgroundColor: theme.colors.primary }]}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        {/* <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.top}>
          <View style={[styles.topContainer, { backgroundColor: theme.colors.secondary }]}>
            <Text style={{ color: '#000' }} >Time: {time}</Text>
            <Text style={{ color: '#000' }}>{date}</Text>
          </View>
        </View> */}
        <View style={styles.top}>
          <View style={[styles.topContainer, { backgroundColor: theme.colors.secondary }]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.subText} >Time: {time}</Text>
            <Text style={styles.subText}>{date}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
