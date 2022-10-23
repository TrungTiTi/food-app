import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from "react";
import { Colors } from "../../global/styles";
import { Divider } from "../../components/Divider";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSignStore } from "../../stores/Sign";

const AccountScreen = () => {
  const [userData, setUserData] = useState();

  const signStore = useSignStore();
  
  const getUser = async() => {
    try {
        const data = await getDoc(doc(db,'users', signStore.userData.user.uid));
        if(data.exists()){
            setUserData(data.data()) ;
        }   
    } catch (error) {
        console.log('errrr', error);
    }
  } 

  useEffect(() => {
    getUser();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.accountImg}
          source={{
            uri: "https://tfwiki.net/mediawiki/images2/thumb/7/7b/Transformers-_Age_of_ExtinctionOptimusPrimePoster.jpg/300px-Transformers-_Age_of_ExtinctionOptimusPrimePoster.jpg",
          }}
        />
        {
          userData &&
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{userData.lastName + ' ' + userData.firstName}</Text>
              <Text style={styles.accountPhone}>{userData.phone}</Text>
              <TouchableOpacity style={styles.infoBtn}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Update Information
                </Text>
              </TouchableOpacity>
            </View>
        }
      </View>

      <Divider />

      <View
        style={{
          marginTop: 12,
          paddingHorizontal: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          History Order
        </Text>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    padding: 20,
    flexDirection: "row",
  },
  accountImg: {
    height: 86,
    width: 86,
    borderRadius: 999,
  },
  accountInfo: {
    marginLeft: 20,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  accountPhone: {
    fontSize: 14,
    color: Colors.grey3,
  },
  infoBtn: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
