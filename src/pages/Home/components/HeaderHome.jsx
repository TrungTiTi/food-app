import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors, parameters } from "../../../global/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconBadge from "react-native-icon-badge";

import SearchInput from "../../../components/SearchInput";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderHome = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState(0);
  const getCart = async () => {
    try {
      const ca = await AsyncStorage.getItem("cart");
      let car = ca ? JSON.parse(ca ? ca : "") : "";
      setCart(car.length);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={{}}>
          <SearchInput searchWidth={90} />
        </View>

        <Pressable
          style={styles.container}
          onPress={() => {
            navigation.navigate("Your Cart");
          }}
        >
          {/* <IconBadge
            MainElement={
              <Icon name="cart" size={36} color={Colors.cardbackground} />
            }
            // BadgeElement={
            //   <Text style={{ color: Colors.cardbackground }}></Text>
            // }
            IconBadgeStyle={{
              position: "absolute",
              top: 8,
              right: -5,
              minWidth: 20,
              height: 20,
              backgroundColor: "red",
            }}
          /> */}
          <Icon name="cart" size={36} color={Colors.cardbackground} />
        </Pressable>
      </View>
    </>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.buttons,
    height: 120,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  textHeading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
