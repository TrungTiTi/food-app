import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors, parameters } from "../../global/styles";

import SearchInput from "../../components/SearchInput";
import { Divider } from "../../components/Divider";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ListFood = ({ navigation, route }) => {
  const item = route.params;
  const [listFood, setListFood] = useState();

  const getFoods = async () => {
    const q = query(
      collection(db, "Food-product"),
      where("type", "==", item.type)
    );
    const querySnapshot = await getDocs(q);
    const listData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setListFood(listData);
    return listData;
  };
  useEffect(() => {
    getFoods();
  }, []);

  const [gg, setGg] = useState();
  const test = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      setGg(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    test();
  }, []);
  console.log(gg);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <SearchInput searchWidth={90} />
      </View>
      <Divider />

      <ScrollView>
        <View
          style={{
            paddingHorizontal: parameters.paddingPage,
            marginTop: 16,
          }}
        >
          <Text style={styles.textCategory}>{item.type}</Text>
          {listFood
            ? listFood.map((item) => (
                <TouchableOpacity
                  style={styles.cardFood}
                  onPress={() => navigation.navigate("FoodDetail", item)}
                  key={item.id}
                >
                  <Image
                    style={styles.foodImg}
                    source={{
                      uri: `${item.image}`,
                    }}
                  />
                  <View style={styles.foodInfo}>
                    <Text style={styles.textName}>{item.des}</Text>
                    <Text>{item.price} $</Text>
                    <Text>{item.des}</Text>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardbackground,
  },
  textCategory: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  foodImg: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  cardFood: {
    paddingVertical: 12,
    flexDirection: "row",
  },
  foodInfo: {
    marginLeft: 10,
    paddingTop: 8,
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
