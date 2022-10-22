import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { Colors } from "./global/styles";
import RootNavigator from "./navigation/RootNavigator";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
