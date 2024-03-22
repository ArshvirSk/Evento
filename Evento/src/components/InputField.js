import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputField = ({ name, onBlur, onChange, value }) => {
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <TextInput
        placeholder={name}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        style={styles.inputField}
        placeholderTextColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 4,
    borderColor: '#b8b8b8',
    backgroundColor: 'rgba(255, 255, 255, 0.404)',
    borderRadius: 3,
    padding: 8,
    marginBottom: 16,
    color: '#000',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
    color: '#000',
  },
});

export default InputField;
