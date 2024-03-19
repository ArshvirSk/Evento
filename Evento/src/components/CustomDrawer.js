import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Image, Text, View } from "react-native";

const image = require("../assets/Valorant.jpeg");

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "red" }}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            height: 130,
          }}
        ></Image>
        <View style={{ backgroundColor: "white", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
