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
import { useFoodManagementStore } from "../../stores/FoodManagement";
import { observer } from "mobx-react-lite";

const ListFood = ({ navigation, route }) => {
  const item = route.params;
  const [listData, setListData] = useState(null);
  const foodStore = useFoodManagementStore();
  
  const getList = async () => {
    await foodStore.getFoods(item);
    setListData(foodStore.listFood);
     
  }

  useEffect(() => {
    getList()
  }, [foodStore.test]);

  
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
          {listData
            ? listData.map((item) => (
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

export default ListFood;
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
