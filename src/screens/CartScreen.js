import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {PrimaryButton} from '../components/Button';
import { OrderContext } from '../context/orderContext';
import { AntDesign } from '@expo/vector-icons';
const CartScreen = ({navigation}) => {
  
  const {listOrders,setListOrders} = useContext(OrderContext)
  const list = [...listOrders]

  var sum = list.reduce( (money,item) => money+ item.price,0)
  const [total,setTotal] = useState(sum)

  const OneFood = ({item}) => {
   
    const [price,setPrice] = useState(item.price)
    const [amout,setAmout] = useState(item.quantity)
    const itemb = {...item}
    const singleItemCost = itemb.price/itemb.quantity

    useEffect(()=>{
      // setTotal(sum)
      var sum = list.reduce((money,item)=> money + item.price,0)
      setTotal(sum)
    },[item.quantity])

    const onpressIncrease = ()=>{
        setAmout(amout+1)
        setPrice(singleItemCost * (amout+1) )
        item.quantity = (amout+1)
        item.price = singleItemCost * (amout+1)
    }
    const onpressDecrease = ()=>{
        if(amout == 1){
            // setAmout(1)
          const i = list.findIndex(e => e.id == item.id)
          // console.log(i)
          if(i > -1){
            list.splice(i,1)
            setListOrders(list)
          }
        }else{
            setAmout(amout-1)
            setPrice(singleItemCost * (amout-1))
            item.quantity = (amout -1)
            item.price = singleItemCost * (amout -1)
        }
    }

    return (
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
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quantity}</Text>
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={onpressDecrease}>
              <AntDesign name="minuscircle" size={24} color="black" />
            </TouchableOpacity>
            {/* <Text style= {style.amout}>{amout}</Text> */}
            <TouchableOpacity onPress={onpressIncrease}>
              <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={list}
        renderItem={({item}) => <OneFood item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price:
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold',color:COLORS.primary}}>{total} $</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <PrimaryButton title="CHECKOUT" onPress={()=>{
                Alert.alert('thanks for shopping')
              }} />
            </View>
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

export default CartScreen;
