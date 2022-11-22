import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import foods from "../consts/foods";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FavoriteContext } from "../context/favoriteContext";

const SerchScreen = ({ navigation }) => {
  const [data, setData] = useState(foods);

  const OneFood = ({ item }) => {
    return (
      <Pressable
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("DetailsScreen", item)}
      >
        <View style={style.cartCard}>
          <Image source={item.image} style={{ height: 80, width: 80 }} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.grey }}>
              {item.ingredients}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              ${item.price}
            </Text>
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: item.like
                ? "rgba(245, 42, 42,0.2)"
                : "rgba(0,0,0,0.2) ",
            }}
          >
            <Icon
              name="favorite"
              size={25}
              color={item.like ? COLORS.red : COLORS.black}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search"
            onChangeText={(name) => {
              const newData = foods.filter((e) => e.name.toUpperCase().includes(name.toUpperCase()));
              // console.log(newData)
              setData(newData)
            }}
          />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data}
        renderItem={({ item }) => <OneFood item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => <View></View>}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  actionBtn: {
    width: 80,
    height: 35,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default SerchScreen;
