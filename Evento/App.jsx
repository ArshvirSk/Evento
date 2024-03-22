import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './src/components/CustomDrawer';
import CompletedScreen from './src/screens/CompletedScreen';
import ContactScreen from './src/screens/ContactScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import EventsScreen from './src/screens/EventsScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PaymentScreen from './src/screens/RegisterScreens/PaymentScreen/PaymentScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function DrawerScreen() {
  const theme = useTheme();
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
        component={EventsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size + 4} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications-outline" size={size} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Contact Us"
        component={ContactScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="call-outline" size={size + 4} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
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
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
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
    </NavigationContainer>
  );
}
