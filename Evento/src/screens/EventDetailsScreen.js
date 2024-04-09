import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { EVENTS } from '../data/data';

export default function EventDetailsScreen({ route, navigation }) {
  const theme = useTheme();
  const { eventId, mydata } = route.params;
  console.log(route.params);

  const selectedEvent = EVENTS.find((event) => event.id === eventId);

  function registerHandler() {
    navigation.navigate('EventRegistration', {
      screen: 'Register',
      params: { eventId: eventId, mydata: mydata },
    });
  }

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={{ marginHorizontal: 15 }}>
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

          {/* Image */}
          <View style={[styles.shadowProp, { marginBottom: 10 }]} >
            <View style={[styles.image, { position: 'absolute', left: 10, bottom: -10, backgroundColor: '#0543be', borderRadius: 17 }]} />
            <Image source={selectedEvent.imageUrl} style={styles.image} />
          </View>

          {/* Description */}
          <View>
            <Text style={[styles.title, styles.subTitle]}>Description</Text>
            <Text style={styles.desc}>
              {selectedEvent.descrption}
            </Text>
            <Text style={[styles.title, styles.subTitle]}>Objective</Text>
            <Text style={styles.desc}>
              {selectedEvent.objective}
            </Text>
            <Text style={[styles.title, styles.subTitle]}>Rules</Text>
            <Text style={styles.desc}>
              {selectedEvent.rules}
            </Text>
          </View>

          {/* Location */}
          <View>
            <Text style={[styles.title, styles.subTitle]}>Location</Text>
            <Text style={[styles.subButton, { fontWeight: 'bold', fontSize: 14 }]}>Thakur Polytechnic, Kandivali East, Mumbai, Maharashtra</Text>
            {/* <MapView
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
            </MapView> */}
          </View>
        </View>
      </ScrollView>

      {/* Register Button */}
      <View style={[styles.bottom, { backgroundColor: theme.colors.background }]}>
        <Pressable style={[styles.button, { backgroundColor: '#034694' }]} onPress={registerHandler} android_ripple={{ color: '#a8a8a8', borderless: true, foreground: true }} >
          <Text style={[styles.text, { color: 'white', letterSpacing: 5, fontSize: 18 }]}>REGISTER</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 220,
    marginTop: 15,
    // backgroundColor: '#000000',
    // opacity: 0.8,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
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
    // alignSelf: 'stretch',
    borderRadius: 50,
    // // elevation: 25,
    // margin: 10,
    overflow: 'hidden',
  },
  button: {
    height: 60,
    overflow: 'hidden',
    margin: 15,
    // marginTop: 0,
    // marginHorizontal: 15,
    // marginBottom: 10,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
    fontSize: 20,
    letterSpacing: 0.9,
    marginVertical: 5,
    marginTop: 30,
    color: '#000',
  },
  desc: {
    fontSize: 15,
    color: '#000',
    textAlign: 'justify',
  },
  map: {
    // width: 400,
    height: 300,
    marginBottom: 20,
  },
  shadowProp: {
    elevation: 24,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subButton: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#000',
  },
});
