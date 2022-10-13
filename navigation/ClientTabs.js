import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Colors } from "../global/styles";
import Icon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "../pages/Home/HomeScreen";

const ClientTabs = createBottomTabNavigator();

export default function RootClientTabs() {
  return (
    <ClientTabs.Navigator
      tabBarOptions={{
        activeTintColor: Colors.buttons,
      }}
    >
      <ClientTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <ClientTabs.Screen
        name="SearchScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <ClientTabs.Screen
        name="MyAccountScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "MyAccount",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </ClientTabs.Navigator>
  );
}
