import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Colors, parameters } from "../../../global/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconBadge from "react-native-icon-badge";

import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCartStore } from "../../../stores/CartStore";

const HeaderHome = () => {
  const navigation = useNavigation();
  const [cartL, setCartL] = useState(0);
  const cartStore = useCartStore();
  const [text, setText] = useState("");

  const getCartLength = () => {
    setCartL(cartStore.cartData.length);
  };

  useEffect(() => {
    getCartLength();
  }, [cartStore.cartData.length]);

  return (
    <>
      <View style={styles.header}>
        <View style={{}}>
          <KeyboardAvoidingView>
            <View style={[styles.searchArea, { width: "90%" }]}>
              <Pressable
                style={{
                  backgroundColor: "#ec3c5c",
                  height: "100%",
                  borderBottomLeftRadius: 12,
                  borderTopLeftRadius: 12,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Search", { name: text })}
              >
                <Icon
                  name="card-search"
                  size={32}
                  style={styles.searchIcon}
                  color="#fff"
                />
              </Pressable>
              <TextInput
                placeholder="Search..."
                style={styles.searchInput}
                value={text}
                onChangeText={(text) => {
                  setText(text);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>

        <Pressable
          style={styles.container}
          onPress={() => {
            navigation.navigate("Your Cart");
          }}
        >
          {cartL ? (
            <IconBadge
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
            />
          ) : (
            <Icon name="cart" size={36} color={Colors.cardbackground} />
          )}
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

  //search
  text: {
    color: Colors.grey3,
    fontSize: 16,
  },
  searchArea: {
    marginTop: 10,
    height: 40,
    backgroundColor: Colors.grey5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grey4,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: { fontSize: 24, padding: 5, color: Colors.grey2 },
  searchInput: { width: "90%", paddingLeft: 20 },
});
