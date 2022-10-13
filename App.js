import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Colors } from "./global/styles";
import RootNavigator from "./navigation/RootNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <RootNavigator />
    </>
  );
}
