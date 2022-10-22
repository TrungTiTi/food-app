import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Colors, parameters } from "../global/styles";

import Swiper from "react-native-swiper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>DISCOVER RESTAURANTS</Text>
        <Text style={styles.textHeader}>IN YOUR AREA</Text>
      </View>

      <View style={styles.slideContainer}>
        <Swiper autoplay={true}>
          <View style={styles.slideItem}>
            <Image
              source={require("../assets/Images/Home/banner-st.jpg")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <View style={styles.slideItem}>
            <Image
              source={require("../assets/Images/Home/banner-nd.jpg")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <View style={styles.slideItem}>
            <Image
              source={require("../assets/Images/Home/banner-rd.jpg")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.btnContainer}>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate("SignIn");
              //navigation.navigate("RootClientTabs");
            }}
          >
            <Text style={styles.loginBtnTitle}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.createBtnTitle}>Create your account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },
  textHeader: {
    fontSize: 26,
    color: Colors.buttons,
    fontWeight: "bold",
  },
  slideContainer: {
    flex: 4,
    justifyContent: "center",
  },
  slideItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flex: 4,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  createBtn: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.buttons,
    height: 40,
    paddingHorizontal: 20,
  },
  createBtnTitle: {
    color: Colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },
  loginBtn: {
    backgroundColor: Colors.buttons,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 20,
  },
  loginBtnTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    textTransform: "uppercase",
    justifyContent: "center",
    marginTop: 3,
  },
});
