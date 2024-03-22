import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Image, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const image = require('../assets/Evento_logo.png');

const CustomDrawer = (props) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: theme.colors.primary }}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
            height: 150,
            aspectRatio: 1.9,
            resizeMode: 'cover',
          }}
        />
        <View style={{ backgroundColor: 'white', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
