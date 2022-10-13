import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderHome from "./components/HeaderHome";
import HomeCategories from "./components/HomeCategories";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />
      <HomeCategories />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
