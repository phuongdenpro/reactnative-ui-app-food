import { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native"
import { Image } from "react-native"
import { format_currency } from "../utils/utils"

const ProductDetailScreen = (props) => {
    const [product, setProduct] = useState()
    useEffect(() => {
        if (props.route.params.product) {
            setProduct(props.route.params.product)
        }
    }, [props.route.params.product])

    return (


        <View>
            {!product ? null :
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
                            source={{ uri: `${product?.image}` }}></Image>

                    </View>
                    <View style={{
                        padding: 20
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '500',
                                marginBottom: 10
                            }}>{product?.name}</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontWeight: '500',
                                marginBottom: 10,
                            }}>
                                Số lượng tồn kho: {product?.stock} {product?.base_unit.name}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                            paddingBottom: 10
                        }}>
                            <Text style={{
                                fontWeight: '500',
                                marginBottom: 5,
                            }}>
                                Bảng giá
                            </Text>
                            {product?.units.map((unit, idx) => {
                                console.log("unit", unit)
                                return (
                                    <View key={idx} style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={{
                                            fontWeight: '500'
                                        }}>
                                            {unit.unit_name}
                                        </Text>
                                        <Text>
                                            {unit.price ? format_currency(unit.price) : "Không có giá!"}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text>{product?.description}</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default ProductDetailScreen