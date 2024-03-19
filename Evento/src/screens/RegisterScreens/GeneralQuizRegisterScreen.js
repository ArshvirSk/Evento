import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import InputField from '../../components/InputField';
import { departments } from '../../data/data';

const GeneralQuizRegisterScreen = ({ EventId, title }) => {
  const navigation = useNavigation();

  const [department, setDepartment] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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

    // setInputData({
    //   timestamp,
    //   title,
    //   department,
    //   ...data,
    // });

    console.log(inputData);

    navigation.navigate('Payment', { data: inputData });

    // try {
    //   const response = await axios.post(
    //     `http://192.168.99.227:5000/e1`,
    //     inputData
    //   );
    //   console.log(response.data.message);
    // } catch (error) {
    //   console.error(error);
    // }
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
            />
          )}
          name="participant2phonenumber"
        />
        {errors.participant2phonenumber && (
          <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
            This is required.
          </Text>
        )}

        <Button title="Submit"
          onPress={handleSubmit(onSubmit)}
        // onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    margin: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '900',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.5)',
    paddingVertical: 20,
    color: '#000',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
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
});

export default GeneralQuizRegisterScreen;
