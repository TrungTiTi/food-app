import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import HeaderHome from "./components/HeaderHome";
import HomeCategories from "./components/HomeCategories";
import PromotionHome from "./components/PromotionHome";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderHome />
        <HomeCategories />
        <PromotionHome />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
