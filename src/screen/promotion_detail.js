import { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native"
import { Image } from "react-native"
import { formater_date, format_currency } from "../utils/utils"

const PromotionDetailScreen = (props) => {
    const [promotion, setPromotion] = useState()
    useEffect(() => {
        if (props.route.params.promotion) {
            setPromotion(props.route.params.promotion)
        }
    }, [props.route.params.promotion])

    return (


        <View>
            {!promotion ? null :
                <View>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20
                    }}>
                        <Image
                            style={{
                                width: '100%',
                                height: 200,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: `${promotion.image ? promotion?.image : "https://cdn-icons-png.flaticon.com/512/6299/6299658.png"}` }}></Image>
                    </View>
                    <View style={{
                        padding: 20
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '500',
                                marginBottom: 10
                            }}>{promotion?.title}</Text>
                        </View>
                        <View style={{
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                fontWeight: '500',
                            }}>
                                Mã giảm giá: {promotion.promotion_code}
                            </Text>
                            <Text style={{
                            }}>
                                Ngày bắt đầu: {formater_date(promotion.start_date)}
                            </Text>
                            <Text style={{
                            }}>
                                Ngày kết thúc: {formater_date(promotion.end_date)}
                            </Text>
                        </View>
                       
                        <View style={{
                            paddingVertical: 10,
                            borderTopColor: '#ddd',
                            borderTopWidth: 1
                        }}>
                            <Text>{promotion?.description}</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default PromotionDetailScreen