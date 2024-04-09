import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const InputField = ({ name, onBlur, onChange, value, keyboardType, maxLength, secure }) => {
  const [showPassword, setShowPassword] = useState(secure);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.container} >
        <TextInput
          placeholder={name}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={styles.inputField}
          // keyboardType="number-pad"
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={showPassword}
          maxLength={maxLength ? maxLength : 30}
          placeholderTextColor="#000"
        />
        {secure && (
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        )}
      </View>
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
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
    color: '#000',
  },
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    // paddingHorizontal: 14,
  },
  icon: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
});

export default InputField;
