import { View, Text } from "@ant-design/react-native"
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { formater_datetime, format_currency } from "../../utils/utils"

const OrderItem = ({order}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate("OrderDetail", {order}) }>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: 'white',
                marginVertical: 10
            }}>
                <View style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontWeight: '500'
                        }}>Mã hóa đơn</Text>
                        <Text style={{
                            fontWeight: '500'
                        }}>#{order.id}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontWeight: '500'
                        }}>Thời gian mua</Text>
                        <Text style={{
                            fontWeight: '500'
                        }}>{formater_datetime(order.date_created)}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    paddingVertical: 10
                }}>
                    <View>
                        <Image style={{
                            width: 70,
                            height: 70,
                            marginRight: 15
                        }} source={{ uri: `${order.details[0].product.image}` }} />
                    </View>
                    <View>
                        <Text style={styles.title}>{order.details[0].product.name}</Text>
                        <Text>Đơn giá: {format_currency(order.details[0].price.price)}</Text>
                        <Text>Số lượng: {order.details[0].quantity + " " + order.details[0].unit_exchange.unit_name}</Text>
                        <Text style={{ color: 'red' }}>Thành tiền: {format_currency(order.details[0].quantity * order.details[0].price.price)}</Text>
                    </View>
                </View>
                <View style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#6d6d6d',
                        fontSize: 12
                    }}>Xem thêm sản phẩm</Text>
                </View>
                <View style={{
                    paddingTop: 10,
                    marginTop: 10
                }}>
                    <View style={styles.space_between}>
                        <Text>Tạm tính</Text>
                        <Text>{format_currency(order.total)}</Text>
                    </View>
                    <View style={styles.space_between}>
                        <Text>Khuyến mãi</Text>
                        <Text>{format_currency(order.final_total - order.total)}</Text>
                    </View>
                    <View style={styles.space_between}>
                        <Text style={{ color: 'red' }}>Thành tiền</Text>
                        <Text style={{ color: 'red' }}>{format_currency(order.final_total)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    space_between: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default OrderItem