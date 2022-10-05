import React from 'react';
import { View, Image, Text, Button, StyleSheet} from 'react-native';

const Test = () => {
    return (
        <View>
            <View style={styles.foodOrder}>

                <View style={styles.foodImg}>
                    <Image style={styles.tinyLogo}
                        
                        source={{uri :'https://storage.googleapis.com/sales.appinst.io/2019/04/takeaway-app-food-ordering-menu.png'}}
                    />
                </View>
                <View style={styles.foodContent} >
                    <View style={styles.foodTitle}>
                        <Text style={styles.textTitle}>Pumpkin Soup</Text>
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
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    foodOrder:{
        display: 'flex',
        flexDirection: 'row'
    },
    foodImg: {
      paddingTop: 0,
      width: '35%'

    },
    foodContent: {
        width: '65%',
        justifyContent: 'space-between'
    },
    foodTitle: {

    },
    foodPrice: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    tinyLogo: {
        width: '100%',
        height: 100,
      },
    textTitle:{
        fontWeight: 600,
        fontSize: 18
    }
  });