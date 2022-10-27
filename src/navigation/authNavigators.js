import React from "react";

import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import WelcomeScreen from "../pages/WelcomeScreen";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RootClientTabs from "./ClientTabs";
import FoodDetail from "../pages/FoodDetail";
import ListFood from "../pages/ListFood";
import Cart from "../components/Cart";
import DetailOrder from "../components/DetailOrder";
import MatchingItem from "../components/MatchingItem";

const Auth = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Auth.Screen
        name="RootClientTabs"
        component={RootClientTabs}
        options={{
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="FoodDetail"
        component={FoodDetail}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Auth.Screen
        name="ListFood"
        component={ListFood}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Auth.Screen
        name="Your Cart"
        component={Cart}
        options={{
          headerTitleAlign: "center",
        }}
      />

      <Auth.Screen
        name="Order"
        component={DetailOrder}
        options={{
          headerTitleAlign: "center",
        }}
      />

      <Auth.Screen
        name="Search"
        component={MatchingItem}
        options={({ route }) => ({
          headerTitleAlign: "center",
          title: route.params.name,
        })}
      />
    </Auth.Navigator>
  );
}
