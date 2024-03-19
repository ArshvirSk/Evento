import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { EVENTS } from '../data/data';

export default function EventDetailsScreen({ route, navigation }) {
  const eventId = route.params.eventId;

  const selectedEvent = EVENTS.find((event) => event.id === eventId);

  function registerHandler() {
    navigation.navigate('Register', {
      eventId: eventId,
    });
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image source={selectedEvent.imageUrl} style={styles.image} />
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View>
              <Text
                style={[styles.title, styles.font24, styles.letterSpacing12]}
              >
                {selectedEvent.title}
              </Text>
              <Text style={styles.font16}>{selectedEvent.date}</Text>
            </View>
            <View>
              <Text
                style={[
                  styles.priceContainer,
                  styles.font24,
                  styles.letterSpacing12,
                ]}
              >
                ₹{selectedEvent.price}
              </Text>
              <Text style={styles.priceContainer}>per participant</Text>
            </View>
          </View>

          {/* Description */}
          <View>
            <Text style={[styles.title, styles.subTitle]}>Description</Text>
            <Text style={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              pulvinar porta posuere. Etiam mollis dignissim velit ut dapibus.
              Sed interdum ullamcorper velit vel euismod. Praesent a dapibus
              sapien, bibendum rhoncus libero. Aenean eu congue tortor.
              Phasellus dictum arcu nec mattis bibendum. Nam et sodales ipsum.
              Quisque lobortis volutpat egestas. In euismod ante id justo
              feugiat, vitae volutpat nisl auctor. Proin vitae sem vitae lorem
              condimentum posuere vel nec metus.
            </Text>
          </View>

          {/* Location */}
          <View>
            <Text style={[styles.title, styles.subTitle]}>Location</Text>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 19.213624945210732,
                longitude: 72.86482745079506,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 19.213624945210732,
                  longitude: 72.86482745079506,
                }}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>

      {/* Register Button */}
      <View style={styles.bottom}>
        <Pressable style={styles.button} onPress={registerHandler}>
          <Text style={styles.text}>REGISTER</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 220,
    marginTop: 15,
    backgroundColor: '#000000',
    opacity: 0.8,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
  },
  priceContainer: {
    textAlign: 'right',
    color: '#000',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  button: {
    height: 60,
    margin: 15,
    // marginTop: 0,
    // marginHorizontal: 15,
    // marginBottom: 10,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  text: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  font24: {
    fontSize: 24,
    color: '#000',
  },
  font16: {
    fontSize: 16,
    color: '#000',
  },
  letterSpacing12: {
    letterSpacing: 1.2,
    color: '#000',
  },
  subTitle: {
    fontSize: 18,
    letterSpacing: 0.9,
    marginVertical: 5,
    color: '#000',
  },
  desc: {
    fontSize: 15,
    color: '#000',
  },
  map: {
    // width: 400,
    height: 300,
    marginBottom: 20,
  },
});
