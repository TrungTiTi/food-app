import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import CheckBox from "@react-native-community/checkbox";

import { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  }, [isSelected]);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.signUpTitleDiv}>
        <Text style={styles.signUpTitleText}> Sign Up </Text>{" "}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />{" "}
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />{" "}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />{" "}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={showPass}
        />{" "}
      </View>
      <View style={styles.checkboxContainer}>
        {/* <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />{" "} */}
        <Text style={styles.label}> Show password ? </Text>{" "}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}> Register </Text>{" "}
        </TouchableOpacity>{" "}
      </View>{" "}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "90%",
  },
  signUpTitleDiv: {
    marginTop: 100,
    marginBottom: 60,
  },
  signUpTitleText: {
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
  },
  checkbox: {
    alignSelf: "center",
  },
});
