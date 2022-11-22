import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity,Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import foods from "../consts/foods";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavoriteContext } from "../context/favoriteContext";

const FavoriteScreen = ({ navigation }) => {

  const {listFavorites,setListFavorites} = useContext(FavoriteContext)
  const list = [...listFavorites]
  

  const OneFood = ({item}) => {
    return (
      <Pressable
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', item)}>
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          {/* <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quantity}</Text> */}
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={()=>{
                  const i = list.findIndex(e => e.id == item.id)
                  // console.log(i)
                  if(i > -1){
                    list.splice(i,1)
                    setListFavorites(list)
                    item.like = false;
                  }    
            }}>
              <MaterialCommunityIcons name="delete-off" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Pressable>
      
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Favorite</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={listFavorites}
        renderItem={({item}) => <OneFood item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20
  },
  actionBtn: {
    width: 80,
    height: 35,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical:5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
});

export default FavoriteScreen;
