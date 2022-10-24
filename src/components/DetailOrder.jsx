import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Divider } from "./Divider";
import { Colors } from "../global/styles";

const DetailOrder = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.icon}>
            <Icon name="check" size={30} color="#4bf55c" />
          </View>

          <Text style={styles.heading}>Delivery successful</Text>

          <Text style={{ fontSize: 16 }}>
            Thank you for purchasing from us !
          </Text>
        </View>

        <Divider />

        <View style={styles.infoFood}>
          <View style={styles.infoItem}>
            <Text
              style={styles.nameItem}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Craftsman and Wolves Craftsman and Wolves Craftsman and Wolves
              Craftsman and Wolves
            </Text>

            <Text style={{ fontSize: 16 }}>Cake</Text>
          </View>

          <Image
            style={{ height: 80, width: 80, borderRadius: 12 }}
            source={{
              uri: "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/95387/japanese-milk-bread.5c3e3677db6b145b659e702af3098337.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
            }}
          />
        </View>

        <View style={styles.totalPrice}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total</Text>

            <Text style={{ fontSize: 16, fontWeight: "bold" }}>1000000 $</Text>
          </View>
        </View>

        <Divider />
      </View>

      <View style={styles.footerBtn}>
        <TouchableOpacity style={styles.buyBtn}>
          <Icon name="reload" size={26} color="white" />
          <Text style={styles.textBtn}>Re-order</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#4bf55c",
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoFood: {
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: 12,
  },
  infoItem: {
    flex: 1,
    marginRight: 12,
  },
  nameItem: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  buyBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#2431ef",
    marginHorizontal: 20,
  },
  textBtn: {
    color: "white",
    fontSize: 18,
    marginVertical: 12,
    marginLeft: 6,
  },
  footerBtn: {
    justifyContent: "flex-end",
    paddingVertical: 16,
    borderTopWidth: 2,
    borderTopColor: "#dee0e4",
    backgroundColor: Colors.cardbackground,
  },
  totalPrice: {
    borderTopWidth: 1,
    borderTopColor: "#dee0e4",
    paddingTop: 12,
    marginVertical: 20,
  },
});
