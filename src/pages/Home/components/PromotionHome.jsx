import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";

import { promotionFood } from "../../../global/staticData";
import { Colors } from "../../../global/styles";

const PromotionHome = () => {
  const [indexCheck, setIndexCheck] = React.useState("0");

  return (
    <View styles={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Promotions available</Text>
      </View>

      <View
        style={{
          marginTop: 12,
        }}
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={promotionFood}
          keyExtractor={(item) => item.id}
          extraData={indexCheck}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setIndexCheck(item.id);
              }}
            >
              <View style={styles.cardItem}>
                <Image
                  style={{ height: 200, width: 300, borderRadius: 8 }}
                  source={item.images}
                />

                <View
                  style={{
                    marginTop: 4,
                  }}
                >
                  <Text style={styles.cardText}>{item.name}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default PromotionHome;

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
    margin: 10,
    borderRadius: 12,
  },

  cardText: {
    color: Colors.grey2,
    fontWeight: "bold",
    fontSize: 16,
  },
});
