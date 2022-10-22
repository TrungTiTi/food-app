import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <Text>Bottom</Text>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
