import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomeScreen from './pages/HomeScreen';
import Test from './pages/Test';
// import ListFood from './pages/ListFood';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen 
            options={{headerShown: false}} 
            name="test"
            component={Test}
          />
          <Stack.Screen 
            
            name="Login"
            component={SignIn}
          />
          < Stack.Screen 
            name='SignUp'
            component={SignUp}
          />
          < Stack.Screen 
            name='Home'
            component={HomeScreen}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
