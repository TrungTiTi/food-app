import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Colors } from "../../../global/styles";

import { categoriesData } from "../../../global/staticData";
import { useNavigation } from "@react-navigation/core";

const HomeCategories = () => {
  const [indexCheck, setIndexCheck] = React.useState("0");

  const navigation = useNavigation();

  return (
    <View styles={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Categories</Text>
      </View>

      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categoriesData}
          keyExtractor={(item) => item.id}
          extraData={indexCheck}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setIndexCheck(item.id);
                navigation.navigate("FoodDetail");
              }}
            >
              <View
                style={
                  indexCheck === item.id
                    ? { ...styles.cardItemSelected }
                    : { ...styles.cardItem }
                }
              >
                <Image
                  style={{ height: 60, width: 60, borderRadius: 8 }}
                  source={item.image}
                />

                <View
                  style={{
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={
                      indexCheck === item.id
                        ? { ...styles.cardTextSelected }
                        : { ...styles.cardText }
                    }
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    backgroundColor: Colors.grey5,
    paddingHorizontal: 4,
    paddingLeft: 12,
  },
  textHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.grey2,
  },
  cardItem: {
    backgroundColor: Colors.cardbackground,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
    width: 80,
    height: 100,
    margin: 10,
  },
  cardItemSelected: {
    backgroundColor: Colors.buttons,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
    width: 80,
    height: 100,
    margin: 10,
    borderRadius: 8,
  },
  cardText: {
    color: Colors.grey2,
    fontWeight: "bold",
    fontSize: 16,
  },
  cardTextSelected: {
    color: Colors.cardbackground,
    fontWeight: "bold",
    fontSize: 16,
  },
});
