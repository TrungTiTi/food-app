import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../global/styles";

import Icon from "react-native-vector-icons/MaterialIcons";

import { Divider } from "../components/Divider";
import { useCartStore } from "../stores/CartStore";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/core";

const OrderFood = ({ modal, hideModal, itemFood }) => {
  const navigation = useNavigation();
  const [qnt, setQnt] = React.useState(1);

  const cartStore = useCartStore();
  const handleAddQnt = () => {
    
    setQnt(qnt + 1);
  };

  const handleMinusQnt = () => {
    qnt === 0 ? qnt : setQnt((prev) => prev - 1);
  };

  const handleAddFood = async () => {
    const cartList = {
      name: itemFood.name,
      type: itemFood.type,
      price: itemFood.price,
      des: itemFood.des,
      image: itemFood.image,
      count: qnt,
      payment: qnt * itemFood.price,
      id: itemFood.id,
    };

    await cartStore.addCartStorage(cartList, navigation);
    
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {}}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.modalView}>
          <View style={styles.headingOrder}>
            <View style={{ flex: 5, alignItems: "center" }}>
              <Text style={styles.textHeading}>Thêm món</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Icon name="close" color="#1123" size={30} onPress={hideModal} />
            </View>
          </View>

          <View style={styles.cardFood}>
            <Image
              style={styles.foodImg}
              source={{
                uri: `${itemFood.image}`,
              }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={styles.textFood}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {itemFood.name}
              </Text>
              <Text style={styles.textFood}>{itemFood.price} $</Text>
              <Text numberOfLines={3} style={styles.descFood}>
                {itemFood.des}
              </Text>
            </View>
          </View>

          <Divider />

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.handleOrder}>
              <View style={styles.handleQnt}>
                <TouchableOpacity
                  style={styles.btnQnt}
                  onPress={() => handleMinusQnt()}
                >
                  <Icon name="remove" size={20} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{qnt}</Text>
                <TouchableOpacity
                  style={styles.btnQnt}
                  onPress={() => handleAddQnt()}
                >
                  <Icon name="add" size={20} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btnBuy}
                onPress={() => handleAddFood()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: Colors.cardbackground,
                  }}
                >
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderFood;
const styles = StyleSheet.create({
  modalView: {
    height: "80%",
    backgroundColor: Colors.cardbackground,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headingOrder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  textHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardFood: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  foodImg: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  textFood: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descFood: {
    fontSize: 16,
    color: Colors.grey4,
  },
  handleOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  handleQnt: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  btnQnt: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.grey4,
  },
  btnBuy: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: 46,
    borderRadius: 8,
  },
});
