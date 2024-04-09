import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/InputField';

const RegisterScreen = ({ navigation }) => {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [passMatch, setPassMatch] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const inputData = Object.values(data);
        console.log(inputData);

        var user = inputData[0];
        var phone = inputData[1];
        var pass = inputData[2];

        console.log(phone);
        console.log(pass);

        try {
            if (inputData[2] === inputData[3]) {
                const response = await axios.post('http://192.168.1.248:5000/userCreate', inputData);
                console.log(response.data.success);
                if (response.data.success === false) {
                    setModalVisible(true);
                } else {
                    console.log('User Created');
                    navigation.replace('Drawer', { data: { user, phone, pass } });
                }
                setPassMatch(false);
            } else {
                setPassMatch(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.centeredView} >
            <View style={styles.formContainer} >
                <Text style={styles.title} >NEW USER</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            name="Username"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            maxLength={10}
                        />
                    )}
                    name="username"
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
                            name="Phone Number"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            keyboardType={'number-pad'}
                            maxLength={10}
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
                            secure
                        />
                    )}
                    name="password"
                />
                {errors.password && (
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
                            name="Re-enter Password"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            secure
                        />
                    )}
                    name="reenterpassword"
                />
                {errors.reenterpassword && (
                    <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>
                        This is required.
                    </Text>
                )}
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
                    Register
                </Button>
                <Link
                    to={{ screen: 'LoginScreen' }}
                    style={{ textAlign: 'center', fontStyle: 'italic', textDecorationLine: 'underline', color: '#00308F', fontWeight: '500', marginTop: 20 }}
                >
                    Login!
                </Link>
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
                            <Text style={styles.modalText}>User alerady exists.</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Okay</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.centeredView} >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={passMatch}
                    onRequestClose={() => {
                        setPassMatch(!passMatch);
                        console.log('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.modalView}>
                            <Icon name="alert-circle-outline" size={56} color={'#b90000'} />
                            <Text style={styles.modalText}>Password doesn't match.</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setPassMatch(!passMatch)}>
                                <Text style={styles.textStyle}>Okay</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default RegisterScreen;

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
