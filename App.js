import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { Colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <>
      <RootNavigator />
    </>
  );
}
