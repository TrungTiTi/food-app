import AsyncStorage from "@react-native-async-storage/async-storage";
import { set, ref, getDatabase } from "firebase/database";
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

export const FoodDetail = ({ route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [comment, setComment] = React.useState();
  const [user, setUser] = React.useState();
  const item = route.params;

  const dbRealtime = getDatabase();
  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  const onChangeComment = (e) => {
    setComment(e);
  };

  const getUser = async () => {
    try {
      const us = await AsyncStorage.getItem("user");
      let use = us ? JSON.parse(us ? us : "") : "";
      setUser(use);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("uuuu", user);
  console.log("aaaa", item);
  const handleComment = () => {
    let dateNow = new Date().toLocaleString() + "";

    // set(ref(dbRealtime, "rating/" + `${item.id}/` + user && user.uid), {
    //   id: user && user.uid,
    //   rate: 0,
    //   comment: comment,
    //   date: dateNow,
    // });
  };

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
