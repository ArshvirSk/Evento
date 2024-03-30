import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/InputField';

const LoginScreen = ({ navigation }) => {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const inputData = Object.values(data);
        console.log(inputData);
        try {
            const response = await axios.post('http://192.168.1.248:5000/userCheck', inputData);
            console.log(response.data.success);
            if (response.data.success) {
                navigation.navigate('Drawer');
                console.log('User logged in');
            } else {
                setModalVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.centeredView} >
            <View style={styles.formContainer} >
                <Text style={styles.title} >LOGIN</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            name="Phone Number"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                    name="phonenumber"
                />
                {errors.phonenumber && (
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
                            name="Password"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                {errors.password && (
                    <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
                        This is required.
                    </Text>
                )}
                <View>
                    <Button
                        mode="contained-tonal"
                        // icon="home"
                        style={{ backgroundColor: '#034694', marginTop: 20, marginHorizontal: 20, paddingVertical: 7, borderRadius: 50 }}
                        textColor="#fff"
                        labelStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 5 }}
                        uppercase
                        rippleColor={theme.colors.background}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                    <Link
                        to={{ screen: 'RegisterScreen' }}
                        style={{ textAlign: 'center', fontStyle: 'italic', textDecorationLine: 'underline', color: '#00308F', fontWeight: '500', marginTop: 20 }}
                    >
                        New user!
                    </Link>
                </View>
            </View>
            <View style={styles.centeredView} >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        console.log('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.modalView}>
                            <Icon name="alert-circle-outline" size={56} color={'#b90000'} />
                            <Text style={styles.modalText}>User not found.</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Okay</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginHorizontal: 30,
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: '900',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255,0.1)',
        paddingVertical: 20,
        letterSpacing: 5,
        color: '#000',
    },
    centeredView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    modalView: {
        margin: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    buttonMModal: {
        borderRadius: 20,
        padding: 10,
        // elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#21b1f3',
        padding: 10,
        borderRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
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

export default LoginScreen;
