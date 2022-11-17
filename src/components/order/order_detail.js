import { Text, View } from "@ant-design/react-native"
import { useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"
import { formater_datetime, format_currency } from "../../utils/utils"

const OrderDetailScreen = (props) => {
    const [order, setOrder] = useState()
    useEffect(() => {
        if (props.route.params.order) {
            setOrder(props.route.params.order)
        }
    }, [props.route.params.order])

    return (
        <View>
            {!order ? null :
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
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontWeight: '500'
                            }}>Nhân viên bán hàng</Text>
                            <Text style={{
                                fontWeight: '500'
                            }}>{order.user_created?.fullname}</Text>
                        </View>
                    </View>
                    <View>
                        {order.details.map(detail => {

                            return (
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
                                        }} source={{ uri: `${detail.product.image}` }} />
                                    </View>
                                    <View>
                                        <Text style={styles.title}>{detail.product.name}</Text>
                                        <Text>Đơn giá: {detail.price?.price ? format_currency(detail.price.price) : "Hàng tặng"}</Text>
                                        <Text>Số lượng: {detail.quantity + " " + detail.unit_exchange.unit_name}</Text>
                                        <Text style={{ color: 'red' }}>Thành tiền: {detail.price?.price ? format_currency(detail.quantity * detail.price.price): "Hàng tặng"}</Text>
                                    </View>
                                </View>
                            )
                        })}
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
            }
        </View>
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

export default OrderDetailScreen