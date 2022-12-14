import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import { SecondaryButton } from "../components/Button";
import { AntDesign } from "@expo/vector-icons";
import { OrderContext } from "../context/orderContext";
import { FavoriteContext } from "../context/favoriteContext";

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  const { listOrders, setListOrders } = useContext(OrderContext);
  var newListOrders = [...listOrders];
  const buyItem = { ...item };

  const { listFavorites, setListFavorites } = useContext(FavoriteContext);
  const favList = [...listFavorites];

  const [price, setPrice] = useState(item.price);
  const [amout, setAmout] = useState(1);
  const [isLike, setIsLike] = useState(false);
  const onpressIncrease = () => {
    setAmout(amout + 1);
    setPrice(item.price * (amout + 1));
  };
  const onpressDecrease = () => {
    if (amout < 2) {
      setAmout(1);
    } else {
      setAmout(amout - 1);
      setPrice(item.price * (amout - 1));
    }
  };
  const onPressLove = () => {
    var found = false;
    for (var i = 0; i < favList.length; i++) {
      if (favList[i].name == item.name) {
        found = true;
        break;
      }
    }
    if (!found) {
      favList.push(item);
      item.like = true;
    } else {
      const i = favList.findIndex((e) => e.id == item.id);
      if (i > -1) {
        favList.splice(i, 1);
        item.like = false;
      }
    }
    setListFavorites(favList);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
            >
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              <TouchableOpacity onPress={onPressLove}>
                <View
                  style={{
                    width: 50,
                    height: 50,
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
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.behavior}>
            <TouchableOpacity onPress={onpressDecrease}>
              <AntDesign name="minuscircle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={style.amout}>{amout}</Text>
            <TouchableOpacity onPress={onpressIncrease}>
              <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
            <Text style={style.money}> {price} $</Text>
          </View>
          <Text style={style.detailsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton
              title="Add To Cart"
              onPress={() => {
                buyItem.quantity = amout;
                buyItem.price = price;
                var found = false;
                for (var i = 0; i < newListOrders.length; i++) {
                  if (newListOrders[i].name == buyItem.name) {
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  newListOrders.push(buyItem);
                } else {
                  const i = newListOrders.findIndex(
                    (e) => e.name == buyItem.name
                  );
                  if (i > -1) {
                    newListOrders[i].quantity =
                      buyItem.quantity + newListOrders[i].quantity;
                    newListOrders[i].price =
                      Number(price) + Number(newListOrders[i].price);
                  }
                }

                // newListOrders.push(buyItem);
                setListOrders(newListOrders);
                ToastAndroid.showWithGravityAndOffset(
                  "Add to cart successfully!",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
                navigation.navigate("Home");
                // console.log(newListOrders)
              }}
            />
          </View>
        </View>
      </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  behavior: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  money: {
    position: "absolute",
    right: 0,
    paddingVertical: 8,
    fontSize: 17,
    fontWeight: "bold",
    // color: COLORS.red,
    // backgroundColor:COLORS.white,
    borderRadius: 20,
  },
  amout: {
    paddingHorizontal: 16,
    fontSize: 17,
  },
});

export default DetailsScreen;
