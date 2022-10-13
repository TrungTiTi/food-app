import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors, parameters } from "../../../global/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconBadge from "react-native-icon-badge";

const HeaderHome = () => {
  const [count, setCount] = React.useState(1);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.container}>
          <Icon name="menu" size={34} color={Colors.cardbackground} />
        </View>

        <View style={styles.container}>
          <Text style={styles.textHeading}>Home</Text>
        </View>

        <View style={styles.container}>
          <IconBadge
            MainElement={
              <Icon name="cart" size={36} color={Colors.cardbackground} />
            }
            BadgeElement={
              <Text style={{ color: Colors.cardbackground }}>{count}</Text>
            }
            IconBadgeStyle={{
              position: "absolute",
              top: 8,
              right: -5,
              minWidth: 20,
              height: 20,
              backgroundColor: "red",
            }}
            Hidden={count === 0}
          />
        </View>
      </View>
    </>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.buttons,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  textHeading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
