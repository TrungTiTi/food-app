import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { Colors } from "../global/styles";
import { useNavigation } from "@react-navigation/core";

const ListOrder = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable
          style={styles.listItem}
          onPress={() => {
            navigation.navigate("Order");
          }}
        >
          <Image
            style={{ height: 120, width: 120, borderRadius: 12 }}
            source={{
              uri: "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/95387/japanese-milk-bread.5c3e3677db6b145b659e702af3098337.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
            }}
          />

          <View style={styles.infoItem}>
            <Text
              style={styles.nameItem}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Craftsman and Wolves Craftsman and Wolves Craftsman and Wolves
              Craftsman and Wolves
            </Text>

            <Text style={styles.typeItem}>Cake</Text>

            <Text style={styles.priceItem}>Total: 1.000.000 $</Text>

            <Text style={styles.statusItem}>Done</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ListOrder;

const styles = StyleSheet.create({
  container: {},
  listItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoItem: {
    marginLeft: 20,
    width: "60%",
  },
  nameItem: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  typeItem: {
    fontSize: 16,
    color: Colors.grey2,
    marginBottom: 4,
  },
  priceItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  statusItem: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#4bf55c",
  },
});
