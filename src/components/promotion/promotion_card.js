import { Text, View } from "@ant-design/react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { Image } from "react-native"
import { formater_date, truncate } from "../../utils/utils"

const PromotionCard = ({ promotion }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("PromotionDetail", { promotion: promotion })}>
            <View style={{
                backgroundColor: 'white',
                padding: 10,
                marginHorizontal: 5,
                borderRadius: 10,
                width: 250
            }}>
                <Image
                    style={{
                        width: 250,
                        height: 200,
                        resizeMode: "center"
                    }} source={{ uri: `${promotion.image ? promotion?.image : "https://cdn-icons-png.flaticon.com/512/6299/6299658.png"}` }} />
                <View style={{
                    // backgrounImage
                }}>

                </View>
                <Text style={{
                    fontSize: 15,
                    fontWeight: "500"
                }}>{promotion.title}</Text>
                <Text style={{
                    fontStyle: 'italic'
                }}>Hạn sử dụng: {formater_date(promotion.end_date)}</Text>
                <Text style={{
                    // fontStyle: 'italic'
                }}>Mã khuyến mãi: {promotion.promotion_code}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PromotionCard