import { useNavigation } from "@react-navigation/core";
import { Link } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";
import { observer} from "mobx-react-lite";
import { useSignStore } from "../../src/stores/Sign";

const SignIn = observer(({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isSelected, setSelection] = useState(false);

  // import
  const signStore = useSignStore();

  useEffect(() => {
    if (isSelected) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  }, [isSelected]);

  const handleSignIn = async () => {
    const data = {
      email: email,
      password: password
    }
    // 
    signStore.signIn(data, navigation);
    // try {
    //   signStore.signIn(data);
    //   if(signStore.userData){
    //     navigation.navigate("RootClientTabs");
    //   }
    // } catch (error) {
      
    // }
    
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.signInTitleDiv}>
        <Text style={styles.signInTitleText}> Sign In </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={showPass}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => {
            setSelection(!isSelected);
          }}
          style={styles.checkbox}
        />
        <Text style={styles.label}> Show password ? </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}> Sign In </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Link to={{ screen: "SignUp" }} style={styles.link}>
          <Text> Don 't you have an account? Sign Up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
});

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "90%",
  },
  signInTitleDiv: {
    marginTop: 100,
    marginBottom: 60,
  },
  signInTitleText: {
    fontSize: 30,
    //fontWeight: 900,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    //fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    //fontWeight: "700",
    fontSize: 16,
  },
  checkboxContainer: {
    marginTop: 15,
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  link: {
    color: "blue",
  },
});
