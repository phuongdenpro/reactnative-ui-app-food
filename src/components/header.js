import { Button, InputItem, View } from "@ant-design/react-native"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react"
import { Image, Text } from "react-native"

const Header = ({ menuSelected, onSearch }) => {
    const navigation = useNavigation();
    const [placeholder, setPlaceholder] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        if(menuSelected){
            if(menuSelected == "home"){
                setPlaceholder("Tìm kiếm khuyến mãi")
                setTitle("")
            }else if(menuSelected == "history"){
                setPlaceholder("Tìm kiếm hóa đơn")
                setTitle("Lịch sử mua hàng")
            }else if(menuSelected == "profile"){
                setTitle("Thông tin cá nhân")
            }
        }
    }, [menuSelected])

    return (
        <View style={{
            flexDirection: 'row',
            paddingTop: 35,
            backgroundColor: 'white'
        }}>
            <View
                style={{
                    flex: 1
                }}>
                {title ?
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '500',
                        marginLeft: 20,
                        marginTop: 5
                    }}>
                        {title}
                    </Text>
                    :
                    <InputItem
                        placeholder={placeholder}
                        onChangeText={onSearch}
                    >
                    </InputItem>
                }
            </View>
            <Button style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                marginRight: 10
            }} 
            onPress={() => navigation.navigate("BarcodeScanner") }
            >
                <Image
                    style={{
                        width: 20,
                        height: 20
                    }}
                    source={require("../../assets/barcode.png")} />
            </Button>
        </View>
    )
}

export default Header