import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors, parameters } from "../../../global/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconBadge from "react-native-icon-badge";

import SearchInput from "../../../components/SearchInput";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCartStore } from "../../../stores/CartStore";

const HeaderHome = () => {
  const navigation = useNavigation();
  const [cartL, setCartL] = useState(0);
  const cartStore = useCartStore();

  const getCartLength = () => {
    setCartL(cartStore.cartData.length);
  }

  useEffect(() => {
    getCartLength();
  }, [cartStore.cartData.length]);

  console.log('aaaaaaaaaa',cartStore.cartData.length);

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
          {
            cartL ? <IconBadge
                MainElement={
                  <Icon name="cart" size={36} color={Colors.cardbackground} />
                }
                BadgeElement={
                  <Text style={{ color: Colors.cardbackground }}>{cartL}</Text>
                }
                IconBadgeStyle={{
                  position: "absolute",
                  top: 8,
                  right: -5,
                  minWidth: 20,
                  height: 20,
                  backgroundColor: "red",
                }}
              /> :
            <Icon name="cart" size={36} color={Colors.cardbackground} /> 
          }
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
