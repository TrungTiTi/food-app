import React from "react";

import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import WelcomeScreen from "../pages/WelcomeScreen";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomeScreen from "../pages/Home/HomeScreen";
import RootClientTabs from "./ClientTabs";
import { FoodDetail } from "../pages/FoodDetail";

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
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
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
          headerShown: false,
        }}
      />
    </Auth.Navigator>
  );
}
