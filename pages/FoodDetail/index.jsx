import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "../../components/Divider";

export const FoodDetail = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.imgTitle}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeMAY3Z-205kWN7XF5u2F8GdNrSs6-RvcMOw&usqp=CAU",
            }}
          />
        </View>
        <View style={styles.detail}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Banhs Trang Tron Sai Gon
          </Text>
          <Text style={{ fontWeight: "bold" }}>20000 d</Text>
          <TouchableOpacity style={styles.btnBuy}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={{ height: 150 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Description
            </Text>
            <Text>
              banh da do, co oc cua bo,
              doafhsjkfhjdsbhfjksagfdahfjkhiuehhfakjehufhaoooooo
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ height: 150 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Description
            </Text>
            <Text>
              banh da do, co oc cua bo,
              doafhsjkfhjdsbhfjksagfdahfjkhiuehhfakjehufhaoooooo
            </Text>
          </View>
        </View>
        <View style={{ height: 150 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Description
            </Text>
            <Text>
              banh da do, co oc cua bo,
              doafhsjkfhjdsbhfjksagfdahfjkhiuehhfakjehufhaoooooo
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  imgTitle: {
    width: "100%",
    height: 300,
  },
  detail: {
    padding: 20,
    height: 180,
    justifyContent: "space-between",
  },
  btnBuy: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown",
    padding: 10,
    borderRadius: 10,
  },
});
