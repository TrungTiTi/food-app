import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, parameters } from "../global/styles";
import { useFoodManagementStore } from "../stores/FoodManagement";
import { useNavigation } from "@react-navigation/core";

const MatchingItem = ({ route }) => {
  const navigation = useNavigation();
  const searchText = route.params.name;
  const [listData, setListData] = useState(null);

  const foodStore = useFoodManagementStore();

  const getList = async () => {
    await foodStore.getAllFoods();
    setListData(foodStore.listFood);
  };

  useEffect(() => {
    getList();
  }, [foodStore.test]);
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>
          Search results :
          <Text style={{ fontSize: 16, fontWeight: "bold" }} numberOfLines={1}>
            {" "}
            {searchText}
          </Text>
        </Text>
      </View>
      <View
        style={{
          paddingLeft: parameters.paddingPage,
          marginTop: 16,
        }}
      >
        <ScrollView>
          {listData
            ? listData
                .filter((item) => {
                  if (searchText === "") {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return item;
                  }
                  return false;
                })
                .map((item) => (
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
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text>{item.price} $</Text>
                      <Text>{item.des}</Text>
                    </View>
                  </TouchableOpacity>
                ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default MatchingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardbackground,
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
    marginBottom: 16,
  },
  foodImg: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  textHeading: {
    fontSize: 16,
  },
  heading: {
    marginTop: 20,
    paddingLeft: 20,
  },
});
