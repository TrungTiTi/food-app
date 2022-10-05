import React from 'react';
import { View } from 'react-native'

const ListFood = () => {
    return (
        <View>
            <View>
            <View style={styles.foodImg}>
                <Image
                    
                    source={require('@expo/snack-static/react-native-logo.png')}
                />
            </View>
            <View style={styles.foodTitle}>
                <Text>Pumpkin Soup</Text>
                <Text>akjlkajslfkjakljfklajflka</Text>
            </View>
            <View style={styles.foodPrice}>
                <Text>$10000</Text>
                <Button 
                    title='+'
                />
            </View>
        </View>
        </View>
    );
};

export default ListFood;


const styles = StyleSheet.create({
    foodImg: {
      paddingTop: 50,
    },
    foodTitle: {

    },
    foodPrice: {
        
    }
  });