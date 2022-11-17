import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Center, HStack, ScrollView, VStack, Image } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons"
import OrderItem from "./order_item";
import api from "../../utils/apis"
import EmptyBox from "../empty_box";
import LoaderInside from "../loader_inside";

const OrderList = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        handleDataOrder()
    }, [])

    const handleDataOrder = async () => {
        setIsLoading(true)
        try {
            const res = await api.order.list()
            if (res.data.code == 1) {
                setData(res.data.data)
            }
            setIsLoading(false)
        } catch (error) {
            console.log('Failed:', error)
            ToastAndroid.showWithGravityAndOffset(
                "Có lỗi xảy ra, vui lòng thử lại sau ít phút!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            setIsLoading(false)
        }
    }

    if(isLoading){
        return (
            <LoaderInside isLoading={isLoading}/>
        )
    }

    return (
        <View style={{
            flex: 1
        }}>
            {data.length == 0 ?
                <EmptyBox title="Không có lịch sử mua hàng!" />
            :
                <FlatList
                    data={data}

                    renderItem={(item) => {
                        return <OrderItem order={item.item} />
                    }} />
            }
        </View>

    )
}

export default OrderList;