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
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useCommentStore } from "../../stores/CommentStore";
import { useSignStore } from "../../stores/Sign";
import Comment from "../../components/Comment";
import {onValue, ref, set} from "firebase/database";
import { getDatabase } from "firebase/database";

const FoodDetail = ({ route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [comment, setComment] = React.useState();
  const [rateNumber, setRateNumber] = React.useState(2.5);
  const item = route.params;

  const commentStore = useCommentStore();
  const signStore = useSignStore();

  const [cmtData, setCmtData] = React.useState();

  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  const onChangeComment = (e) => {
    setComment(e);
  };

  const handleComment = () => {
    commentStore.addComment(item.id, signStore.userData.user.uid, rateNumber, comment);
  }

  const ratingCompleted = (rating) => {
    setRateNumber(rating);
  }

  useEffect(() => {
    const dbRealtime = getDatabase();
    onValue(ref(dbRealtime, `rating/${item.id}`), (snapshot) => {
      setCmtData([]);
        const data = snapshot.val();
        
        if (data !== null) {
        Object.values(data).map((todo) => {
          setCmtData((old) => ([...old, todo]))
        });
        }
    });
  },[]);

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
        <View style={{ height: 150, padding: 20 }}>
          <Text>Comment</Text>
          <TextInput
            onChangeText={(e) => onChangeComment(e)}
            value={comment}
            placeholder="Your Comment"
          />
           <Rating
            // showRating
            onFinishRating={ratingCompleted}
            imageSize={30}
            ratingCount={5}
          />
          <TouchableOpacity style={styles.btnCmt} onPress={handleComment}>
            <Text>Comment</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 150, padding: 20 }}>
        {
          cmtData && cmtData.map((item, index) => (
            <View key={index}>
              <Comment item={item} />
            </View>
          ))
        }
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
  btnCmt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
  },
  btnO: {
    opacity: 0.5
  }
});
