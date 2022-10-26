import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Divider } from "./Divider";
import { Colors } from "../global/styles";
import OrderFood from "./OrderFood";

const DetailOrder = ({navigation, route}) => {
  const itemOrder = route.params.item;
  const itemInform = route.params.itemCart;

  const [modalVisible, setModalVisible] = React.useState(false);
  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  console.log('itemO', itemOrder);
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.icon}>
            {
              itemInform.status ? 
                <Icon name="check" size={30} color="#4bf55c" />
                : <Icon name="close" size={30} color="brown" />
            }
          </View>

          <Text style={styles.heading}>{itemInform.status ? 'Delivery successful' : 'Wait a minute' }</Text>

          <Text style={{ fontSize: 16 }}>
            {itemInform.status ? 'Thank you for purchasing from us !' : 'Sorry for the inconvenience !'}
          </Text>
        </View>

        <Divider />

        <View style={styles.infoFood}>
          <View style={styles.infoItem}>
            <Text
              style={styles.nameItem}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {itemOrder.name}
            </Text>

            <Text style={{ fontSize: 16 }}>Quantity: {itemOrder.count}</Text>
          </View>

          <Image
            style={{ height: 80, width: 80, borderRadius: 12 }}
            source={{
              uri: `${itemOrder.image}`,
            }}
          />
        </View>

        <View style={styles.totalPrice}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total: {itemOrder.payment} $</Text>

          </View>
        </View>

        <Divider />
      </View>

      <View style={styles.footerBtn}>
        <TouchableOpacity style={styles.buyBtn} onPress={() => setModalVisible(true)}>
          <Icon name="reload" size={26} color="white" />
          <Text style={styles.textBtn}>Re-order</Text>
        </TouchableOpacity>
      </View>
      <OrderFood modal={modalVisible} hideModal={hideModal} itemFood={itemOrder} />
    </>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#4bf55c",
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoFood: {
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: 12,
  },
  infoItem: {
    flex: 1,
    marginRight: 12,
  },
  nameItem: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  buyBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#2431ef",
    marginHorizontal: 20,
  },
  textBtn: {
    color: "white",
    fontSize: 18,
    marginVertical: 12,
    marginLeft: 6,
  },
  footerBtn: {
    justifyContent: "flex-end",
    paddingVertical: 16,
    borderTopWidth: 2,
    borderTopColor: "#dee0e4",
    backgroundColor: Colors.cardbackground,
  },
  totalPrice: {
    borderTopWidth: 1,
    borderTopColor: "#dee0e4",
    paddingTop: 12,
    marginVertical: 20,
  },
});
