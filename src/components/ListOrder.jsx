import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../global/styles";
import { useNavigation } from "@react-navigation/core";
import { useCartStore } from "../stores/CartStore";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  query, where, getDoc, orderBy
} from "firebase/firestore";
import { db, auth } from "../../firebase";

const ListOrder = ({itemCart}) => {
  const navigation = useNavigation();
  const cartStore = useCartStore();
  const [cartItem, setCartItem] = useState([]);

  const getCartItem = async (idOrder) => {
    try {
      const data = query(collection(db, 'cartItem'), where("idCart", "==", idOrder));
      const querySnapshot = await getDocs(data);
      const orderList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCartItem(orderList)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getCartItem(itemCart.id);
    
  },[itemCart.id])

  const testDate = new Date(itemCart.date.seconds).toLocaleDateString("en-US");
  console.log('item', itemCart);
  console.log('dare', testDate);
  
  return (
    <View style={styles.container}>
      {/* <ScrollView style={{height: '45%'}}> */}
        {
          cartItem ? 
          <View>
            {cartItem.map((item, index) => (
              <Pressable
                style={styles.listItem}
                onPress={() => {
                  navigation.navigate("Order", {item, itemCart});
                }}
                key={index}
              >
                <Image
                  style={{ height: 120, width: 120, borderRadius: 12 }}
                  source={{
                    uri: `${item.image}`,
                  }}
                />

                <View style={styles.infoItem}>
                  <Text
                    style={styles.nameItem}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>

                  <Text style={styles.typeItem}>Count: {item.count}</Text>

                  <Text style={styles.priceItem}>Price: {item.price}$</Text>

                  <Text >Payment: {item.payment}$</Text>
                </View>
              </Pressable>
            ))}
             <Text>Total: {itemCart.total} $</Text>
             {/* <Text>Date: {itemCart.date}</Text> */}
            <Text style={itemCart.status ? styles.statusDone : styles.statusPending}>
              Status: {itemCart.status ? 'Done' : 'Pending'}
            </Text>
          </View>
          : <Text>null</Text>
        }
        
      {/* </ScrollView> */}
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
  statusDone: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#4bf55c",
  },
  statusPending: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "brown",
  },
});
