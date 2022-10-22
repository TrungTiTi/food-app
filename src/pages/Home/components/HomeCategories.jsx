import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Colors } from "../../../global/styles";

import { useNavigation } from "@react-navigation/core";
import { useCategoryStore } from "../../../stores/CategoryStore";
import { observer } from "mobx-react-lite";

const HomeCategories = observer(() => {
  
  const [indexCheck, setIndexCheck] = React.useState("0");
  const navigation = useNavigation();

  const categoryStore = useCategoryStore();

  useEffect(() => {
    categoryStore.getCates();
  }, [categoryStore.categoryData.length]);

  return (
    <View styles={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Categories</Text>
      </View>

      <View
        style={{
          marginTop: 12,
        }}
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categoryStore.categoryData ? categoryStore.categoryData : null}
          keyExtractor={(item) => item.id}
          extraData={indexCheck}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setIndexCheck(item.id);
                navigation.navigate("ListFood", item);
              }}
            >
              <View style={styles.cardItem}>
                <Image
                  style={{ height: 60, width: 60, borderRadius: 8 }}
                  source={{
                    uri: `${item.image}`,
                  }}
                />

                <View
                  style={{
                    marginTop: 4,
                  }}
                >
                  <Text style={styles.cardText}>{item.type}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
});

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
    borderRadius: 12,
  },

  cardText: {
    color: Colors.grey2,
    fontWeight: "bold",
    fontSize: 16,
  },
});
