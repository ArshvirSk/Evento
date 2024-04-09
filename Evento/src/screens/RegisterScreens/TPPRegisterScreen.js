import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, useTheme } from 'react-native-paper';
import InputField from '../../components/InputField';
import { departments } from '../../data/data';

const TPPRegisterScreen = ({ EventId, title, mydata }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [department, setDepartment] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const DropdownComponent = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        {/* {renderLabel()} */}
        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: 8, color: '#000' }}>
          Department Name
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{ color: '#000' }}
          selectedTextStyle={{ color: '#000' }}
          data={departments}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Department"
          placeholderStyle={{ color: '#000' }}
          value={department}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setDepartment(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    const timestamp = new Date().toString();
    console.log(EventId);

    const inputData = Object.values({
      timestamp,
      EventId,
      title,
      department,
      ...data,
    });

    console.log(inputData);

    try {
      const response = await axios.post(
        // 'http://192.168.1.248:5000/e6check',
        'http://evento-w3o7.onrender.com/e6check',
        inputData
      );
      console.log(response.data.valueMatched);

      if (response.data.valueMatched === true) {
        console.log('Value matched, executing subsequent code...');
        setModalVisible(true);
      } else {
        navigation.navigate('Payment', { data: inputData, mydata: mydata });
        console.log('Value not matched, executing alternative code...');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              name="College Name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="collegename"
        />
        {errors.participant1name && (
          <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
            This is required.
          </Text>
        )}

        {DropdownComponent()}

        {/* Participant 1 */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              name="Participant 1 Name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="participant1name"
        />
        {errors.participant1name && (
          <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
            This is required.
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              name="Participant 1 Phone Number"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              keyboardType={'number-pad'}
              maxLength={10}
            />
          )}
          name="participant1phonenumber"
        />
        {errors.participant1phonenumber && (
          <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
            This is required.
          </Text>
        )}

        {/* Participant 2 */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              name="Participant 2 Name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="participant2name"
        />
        {errors.participant2name && (
          <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
            This is required.
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              name="Participant 2 Phone Number"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              keyboardType={'number-pad'}
              maxLength={10}
            />
          )}
          name="participant2phonenumber"
        />
        {errors.participant2phonenumber && (
          <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
            This is required.
          </Text>
        )}

        <Button
          mode="contained-tonal"
          // icon="home"
          style={{ backgroundColor: '#034694', marginTop: 20, paddingVertical: 7, borderRadius: 50 }}
          textColor="#fff"
          labelStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 5 }}
          uppercase
          rippleColor={theme.colors.background}
          onPress={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            console.log('Modal has been closed.');
            navigation.navigate('EventDetails', { eventId: EventId });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>You are already Registered in this Event!!!</Text>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  console.log('Modal has been closed.');
                  navigation.navigate('Drawer');
                }}>
                <Text style={styles.textStyle}>Okay</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 400,
    marginTop: 0,
    margin: 20,
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '900',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.1)',
    paddingVertical: 20,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 5,
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.404)',
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonMModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#21b1f3',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TPPRegisterScreen;
