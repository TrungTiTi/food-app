import {
    View,
    Text,
    Modal,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import React, {useEffect, useState} from "react";
import { useSignStore } from "../stores/Sign";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
  
const Comment = ({ item }) => {
  
    const signStore = useSignStore();
    const [userData, setUserData] = useState();
    const getA = async() => {
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
       getA();
    },[]);
  
    return (
        <View>
            {
                userData && <Text style={{fontWeight: "bold"}}>{userData.lastName} {userData.firstName}</Text>
            }
          <Text>Date: {item.date}</Text>
          <Text>Comment: {item.comment}</Text>
        </View>
    );
  };
  
export default Comment;
const styles = StyleSheet.create({

});
  