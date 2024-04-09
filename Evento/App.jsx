import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './src/components/CustomDrawer';
import CompletedScreen from './src/screens/CompletedScreen';
import ContactScreen from './src/screens/ContactScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import { default as EventRegisterScreen } from './src/screens/EventRegisterScreen';
import EventsScreen from './src/screens/EventsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PaymentScreen from './src/screens/RegisterScreens/PaymentScreen/PaymentScreen';
import LoginScreen from './src/screens/UserLogin/LoginScreen';
import RegisterScreen from './src/screens/UserLogin/RegisterScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerScreen({ route, navigation }) {
  const data = route.params?.data;
  const theme = useTheme();

  console.log('DRAWER', data);

  function logOutHandler() {
    navigation.replace('Auth');
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: theme.colors.secondary,
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 16,
        },
        drawerStyle: {
          borderRadius: 20,
          // size: 26,
        },
        drawerItemStyle: {
          paddingHorizontal: 10,
          borderRadius: 12,
        },
        // headerStyle: {
        //   backgroundColor: "#aa8073",
        // },
        // headerTintColor: "#fff",
        // headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="Home"
        initialParams={{ data }}
        component={EventsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="call-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        initialParams={{ data }}
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="checkmark-done-outline" size={size + 4} color={color} />
          ),
          title: 'Profile',
          headerRight: () => (
            <Pressable onPress={logOutHandler}>
              <Text style={{ color: '#000', marginRight: 15, fontWeight: '700', fontSize: 16 }} >Log Out</Text>
              {/* <Icon name="log-out-outline" size={32} color={'#000'} /> */}
            </Pressable>
            // <Button
            //   onPress={() => console.log('This is a button!')}
            //   title="Log Out"
            // />
          ),

        }}
      />
    </Drawer.Navigator>
  );
}

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }} >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register User',
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const EventAuth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="Register"
        component={EventRegisterScreen}
        options={{
          title: 'Registration Form',
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
        }}
      />
      <Stack.Screen
        name="Completed"
        component={CompletedScreen}
        options={{
          title: 'Registration Completed',
          headerBackVisible: false,
          headerTitleStyle: {
            // paddingLeft: 40,
            fontSize: 18,
          },
        }}
      />
    </Stack.Navigator>
  );
};


export default function App() {
  useEffect(() => {
    BootSplash.hide();
  });

  return (
    <View style={{ flex: 1 }} >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        >
          {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Drawer"
            options={{
              headerShown: false,
            }}
            component={DrawerScreen}
          />
          <Stack.Screen name="Home" component={EventsScreen} />
          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{
              title: 'Event Details',
            }}
          />
          <Stack.Screen name="EventRegistration" component={EventAuth} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
