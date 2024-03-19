import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactScreen = () => {

  const fullAddress = 'Kandivali, Thakur Complex, Kandivali East, Mumbai, Maharashtra 400101';

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>CONTACT US</Text>
        <View style={styles.container}>
          <Icon name="mail-outline" size={36} color={'#000'} />
          <Pressable style={({ pressed }) => [styles.subButton, pressed ? styles.pressed : '']} onPress={() => Linking.openURL('mailto:tantrautsavtpoly@gmail.com')} >
            <Text style={styles.subButton} >
              xyz@gmail.com
            </Text>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Icon name="call-outline" size={36} color={'#000'} />
          <Pressable style={({ pressed }) => [styles.subButton, pressed ? styles.pressed : '']} onPress={() => Linking.openURL('tel:+9119082525752')} >
            <Text style={styles.subButton}>+91 1234567890</Text>
          </Pressable>
        </View>
        <View>
          {/* <Icon name="location-outline" size={36} /> */}
          <Text style={styles.subButton}>Location</Text>
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

      <View style={styles.aboutUsSection} >
        <Text style={styles.title}>ABOUT US</Text>

        <Text style={styles.subText} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti reiciendis mollitia aut deleniti sapiente magnam! Dolorem voluptatibus error ullam animi!</Text>
        <Text style={styles.subText} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti reiciendis mollitia aut deleniti sapiente magnam! Dolorem voluptatibus error ullam animi!</Text>
        <Text style={styles.subText} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti reiciendis mollitia aut deleniti sapiente magnam! Dolorem voluptatibus error ullam animi!</Text>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: '900',
    textAlign: 'center',
    // paddingVertical: 20,
    // textDecorationLine: 'underline',
    color: '#000',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    color: '#000',
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#000',
  },
  description: {
    textAlign: 'center',
    // fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  pressed: {
    opacity: 0.5,
  },
  map: {
    width: 350,
    height: 300,
    marginBottom: 30,
    marginLeft: 30,
  },
  subButton: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#000',
  },
  aboutUsSection: {
    marginBottom: 30,
  },
});

export default ContactScreen;
