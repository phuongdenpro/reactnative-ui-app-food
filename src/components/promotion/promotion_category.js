import { ListView, Text, View } from "@ant-design/react-native"
import { FlatList, ScrollView } from "react-native"
import PromotionCard from "./promotion_card"

const NUMBER_OF_COLUMNS = 100

const PromotionCategory = ({title, data}) => {
    return (
        <View style={{
            padding: 10
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: "500",
                paddingLeft: 5,
                marginBottom: 10
            }}>{title}</Text>
            <View
                style={{
                    overflow: "scroll",
                }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <FlatList
                        numColumns={NUMBER_OF_COLUMNS}
                        data={data}

                        renderItem={(item) => {
                            return <PromotionCard promotion={item.item} />
                        }} />
                </ScrollView>
            </View>
        </View>
    )
}

export default PromotionCategory