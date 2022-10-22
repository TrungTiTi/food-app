import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../global/styles";
import { useCartStore } from "../stores/CartStore";
import { useSignStore } from "../stores/Sign";

import { Divider } from "./Divider";

const Cart = () => {
  const [cart, setCart] = useState();
  const [sum, setSum] = useState();

  const cartStore = useCartStore();
  const signStore = useSignStore();

  useEffect(() => {
    let sumI = 0;
    if (cartStore.cartData) {
      cartStore.cartData.forEach((e) => {
        sumI += e.payment;
      });
      setSum(sumI);
    }
    console.log('cart', cartStore.cartData);
  }, [cartStore.cartData.length]);

  const addCart = async () => {
    cartStore.addCartFirebase(signStore.userData.user.id, sum);
  }

  return (
    <View style={styles.container}>
      <Divider />
      <View style={{ flex: 1 }}>
        <View style={styles.account}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 999,
            }}
            source={{
              uri: "https://tfwiki.net/mediawiki/images2/thumb/7/7b/Transformers-_Age_of_ExtinctionOptimusPrimePoster.jpg/300px-Transformers-_Age_of_ExtinctionOptimusPrimePoster.jpg",
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            Hiếu lê
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.grey3,
              marginLeft: 4,
            }}
          >
            (you)
          </Text>
        </View>

        <View style={styles.cartList}>
          <ScrollView>
            {cartStore.cartData ? (
              cartStore.cartData.map((item, index) => (
                <View style={styles.itemCartList} key={index}>
                  <Image
                    style={{
                      height: 80,
                      width: 80,
                      marginRight: 8,
                    }}
                    source={{ uri: `${item.image}` }}
                  />
                  <Text numberOfLines={1} style={styles.nameItem}>
                    {item.name}
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={styles.priceItem}>{item.price} $</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>null</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.handleOrder}>
          <View style={styles.totalPrice}>
            <Text style={styles.nameItem}>Totals</Text>
            <Text style={styles.priceItem}>{sum} $</Text>
          </View>
          <TouchableOpacity style={styles.orderBtn} onPress={addCart}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.cardbackground,
              }}
            >
              Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardbackground,
  },
  account: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  cartList: {
    width: "100%",
    marginTop: 20,
    flex: 5,
  },
  itemCartList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 40,
    height: 60,
  },
  nameItem: {
    color: Colors.grey2,
    fontSize: 16,
    flex: 1,
  },
  priceItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  handleOrder: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 12,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  orderBtn: {
    backgroundColor: "red",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
