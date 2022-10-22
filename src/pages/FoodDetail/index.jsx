import React, { useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Divider } from "../../components/Divider";

import OrderFood from "../../components/OrderFood";
import { observer } from "mobx-react-lite";

const FoodDetail = ({ route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [comment, setComment] = React.useState();
  const item = route.params;

  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  const onChangeComment = (e) => {
    setComment(e);
  };

  const handleComment = () => {

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.imgTitle}
            source={{
              uri: `${item.image}`,
            }}
          />
        </View>
        <View style={styles.detail}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontWeight: "bold" }}>{item.price} $</Text>
          <TouchableOpacity
            style={styles.btnBuy}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={{ height: 150 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Description
            </Text>
            <Text>{item.des}</Text>
          </View>
        </View>
        <Divider />
        <View style={{ height: 150 }}>
          <Text>Comment</Text>
          <TextInput
            onChangeText={(e) => onChangeComment(e)}
            value={comment}
            placeholder="Your Comment"
          />
          <TouchableOpacity onPress={handleComment()}>
            <Text>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
      <OrderFood modal={modalVisible} hideModal={hideModal} itemFood={item} />
    </ScrollView>
  );
};
export default FoodDetail;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  imgTitle: {
    width: "100%",
    height: 300,
  },
  detail: {
    padding: 20,
    height: 180,
    justifyContent: "space-between",
  },
  btnBuy: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown",
    padding: 10,
    borderRadius: 10,
  },
});
