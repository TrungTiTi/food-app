import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../global/styles";

export default function SearchInput({ searchWidth }) {
  const [text, setText] = useState("");

  return (
    <KeyboardAvoidingView>
      <View style={[styles.searchArea, { width: `${searchWidth}%` }]}>
        <Icon name="search" size={32} style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.grey3,
    fontSize: 16,
  },
  searchArea: {
    marginTop: 10,
    height: 40,
    backgroundColor: Colors.grey5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grey4,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: { fontSize: 24, padding: 5, color: Colors.grey2 },
  searchInput: { width: "90%" },
});
